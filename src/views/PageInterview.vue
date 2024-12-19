<script setup lang="ts">
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import {useUserStore} from "@/stores/user.ts";
import type {IInterview, IStage} from "@/interfaces.ts";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import dayjs from "dayjs"


const route = useRoute();
const db = getFirestore();
const userStore = useUserStore();

const isLoading = ref<boolean>(true);
const interview = ref<IInterview>();

const docRef = doc(db, `users/${userStore.userId}/interviews`, route.params.id as string);

const getData = async (): Promise<void> => {
  isLoading.value = true;
  const docSnap = await getDoc(docRef);
  interview.value = docSnap.data() as IInterview;
  isLoading.value = false;
  console.log(interview.value);
}

const saveInterview = async (): Promise<void> => {
  isLoading.value = true;
  if (interview.value?.stages && interview.value.stages.length > 0) {
    // const date = interview.value.stages[index].date;
    // interview.value.stages[index].date = dayjs(date).format('DD.MM.YYYY');
    interview.value.stages = interview.value.stages.map((stage: IStage) => {
      return {
        ...stage,
        date: dayjs(stage.date).format('DD.MM.YYYY')
      }
    })
  }
  await updateDoc(docRef, {...interview.value})
  await getData();
}
const addStage = () => {
  if (interview.value) {
    if (!interview.value.stages) {
      interview.value.stages = [];
    }
    interview.value.stages.push({ name: '', date: '', description: ''});
  }
}
const removeStage = (index: number) => {
  if (interview.value) {
    if (interview.value.stages) {
      interview.value.stages.splice(index, 1)
    }
  }
}
// const saveDateStage = (index: number) => {
//   if (interview.value?.stages && interview.value.stages.length) {
//     const date = interview.value.stages[index].date;
//     interview.value.stages[index].date = dayjs(date).format('DD.MM.YYYY');
//     interview.value.stages = interview.value.stages.map((stage: IStage) => {
//       return {
//         ...stage,
//         date: dayjs(stage.date).format('DD.MM.YYYY')
//       }
//     })
//   }
// }

onMounted(async () => await getData())

</script>

<template>
  <app-progress v-if="isLoading"/>
  <div class="content-interview" v-else-if="(interview?.id && !isLoading)">
    {{interview}}
    <app-card>
      <template #title>Interview in Company {{interview.company}}</template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label for="company">Company</label>
          <app-input-text class="input mb-3" id="company" v-model="interview.company"/>
        </div>
        <div class="flex flex-col gap-2">
          <label for="vacancyLink">Description vacancy (Link) </label>
          <app-input-text class="input mb-3" id="vacancyLink"  v-model="interview.vacancyLink"/>
        </div>
        <div class="flex flex-col gap-2">
          <label for="hrName">Contact Name</label>
          <app-input-text class="input mb-3" id="hrName"  v-model="interview.hrName"/>
        </div>
        <div class="flex flex-col gap-2">
          <label for="contactTelegram">Telegram username HR</label>
          <app-input-text class="input mb-3" id="contactTelegram" v-model="interview.contactTelegram" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="contactWhatsApp">WhatsApp HR</label>
          <app-input-text class="input mb-3" id="contactWhatsApp" v-model="interview.contactWhatsApp" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="contactPhone">Phone HR</label>
          <app-input-text class="input mb-3" id="contactPhone"  v-model="interview.contactPhone"/>
        </div>
        <div class="flex flex-wrap gap-2 w-full mb-3">
          <div class="flex-auto">
            <app-input-number class="input" inputId="salaryForm" placeholder="Salary range from"  v-model="interview.salaryFrom" />
          </div>
          <div class="flex-auto">
            <app-input-number class="input"  inputId="salaryTo" placeholder="Salary range to"  v-model="interview.salaryTo" />
          </div>
        </div>

        <app-button label="Add stage" severity="info" icon="pi pi-plus" class="mb-3" @click="addStage"/>
        <template v-if="interview.stages">
          <div v-for="(stage, index) in interview.stages" :key="index" class="interview-stage">
            <div class="flex flex-col gap-2">
              <label :for="`stage-name-${index}`">Stage name</label>
              <app-input-text class="input mb-3" :id="`stage-name-${index}`" v-model="stage.name" />
            </div>
            <div class="flex flex-col gap-2">
              <label :for="`stage-date-${index}`">Date stage passing</label>
<!--              @date-select="saveDateStage(index)"-->
              <app-datepicker class="input mb-3" :id="`stage-date-${index}`" dateFormat="dd.mm.yy" v-model="stage.date" />
            </div>
            <div class="flex flex-col gap-2">
              <label :for="`stage-description-${index}`">Commentary</label>
              <app-textarea class="input mb-3" :id="`stage-description-${index}`" rows="5" v-model="stage.description"/>
            </div>
            <app-button severity="danger" label="Delete stage" @click="removeStage(index)"/>
          </div>
        </template>
        <div class="flex flex-wrap gap-3 mb-3">
          <div class="flex items-center">
            <app-radio inputId="interviewResult1" name="result" value="Refusal" v-model="interview.result" />
            <label for="interviewResult1" class="ml-2">Refusal</label>
          </div>
          <div class="flex items-center">
            <app-radio inputId="interviewResult2" name="result" value="Offer" v-model="interview.result"/>
            <label for="interviewResult2" class="ml-2">Offer</label>
          </div>
        </div>
        <app-button label="Save" icon="pi pi-save" severity="success"  @click="saveInterview"/>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.input {
  width: 100%;
}
.interview-stage {
  border: 1px solid gray;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px
}
</style>
