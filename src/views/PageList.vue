<script setup lang="ts">
import {getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc} from "firebase/firestore";
import {useUserStore} from "@/stores/user.ts";
import type {IInterview} from "@/interfaces.ts";
import {onMounted, ref} from "vue";
import {useConfirm} from "primevue/useconfirm";

const userStore = useUserStore();
const db = getFirestore();
const confirm = useConfirm();

const interviews = ref<IInterview[]>([])
const isLoading = ref<boolean>(true);

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const getData = query(collection(db,`users/${userStore.userId}/interviews`), orderBy('createdAt', 'desc'));
  const listDocs = await getDocs(getData);
  // console.log(listDocs);
  return listDocs.docs.map(doc => doc.data() as T);
}
const loadInterviews = async () => {
  const listInterviews: Array<IInterview> = await getAllInterviews()
  interviews.value = [...listInterviews];
  isLoading.value = false;
}
const confirmRemoveInterview = async( id: string): Promise<void> => {
  confirm.require({
    message: "You want delete this Interview",
    header: "Delete Interview",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    rejectClass: "p-button-secondary p-button-outline",
    acceptClass: "p-button-danger",
    accept: async () => {
      isLoading.value = true;
      await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id));
      await loadInterviews();
      // const listInterviews: Array<IInterview> = await getAllInterviews()
      // interviews.value = [...listInterviews];
      //
      // isLoading.value = false;
    }
  })
}

onMounted(() => {
  loadInterviews();
  // const listInterviews: Array<IInterview> = await getAllInterviews()
  // interviews.value = [...listInterviews];
  // isLoading.value = false;
})
</script>

<template>
  <app-confirm style="display: block"/>
  <app-progress v-if="isLoading" />
  <app-message v-else-if="!isLoading && !interviews.length" severity="info">No interviews added</app-message>
  <div v-else>
    <h1>List Interviews</h1>
    <app-datatable :value="interviews">
      <app-column field="company" header="Company"></app-column>
      <app-column field="hrName" header="HR Name"></app-column>
      <app-column field="vacancyLink" header="Vacancy Link">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank"> {{slotProps.data.vacancyLink}}</a>
        </template>
      </app-column>
      <app-column field="" header="Contact">
        <template #body="slotProps">
          <div class="contacts">
            <a
              v-if="slotProps.data.contactTelegram"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
              target="_blank"
              class="contacts__telegram"
            >
              <span class="contacts__icon pi pi-telegram"></span>
            </a>
            <a
              v-if="slotProps.data.contactWhatsApp"
              :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
              target="_blank"
              class="contacts__whatsapp"
            >
              <span class="contacts__icon pi pi-whatsapp"></span>
            </a>
            <a
              v-if="slotProps.data.contactPhone"
              :href="`https://tell:${slotProps.data.contactPhone}`"
              target="_blank"
              class="contacts__phone"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencil" severity="info"></app-button>
            </router-link>
              <app-button icon="pi pi-trash" severity="danger" @click="confirmRemoveInterview(slotProps.data.id)"></app-button>

          </div>
        </template>
      </app-column>
    </app-datatable>
  </div>
</template>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
</style>
