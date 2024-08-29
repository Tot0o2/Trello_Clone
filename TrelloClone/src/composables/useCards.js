import { onMounted, ref } from "vue";
import axios from "axios";

const API = "http://localhost:3000/card";

export function useCard() {
  const card = ref(null);
  const error = ref("");
  async function load() {
    try {
      const res = await axios.get(API);
      card.value = res.data;
    } catch (e) {
      console.log(e);
      error.value = e.message;
    }
  }
  onMounted(() => {
    load();
  });

  return { card, error, load };
}

export function useCreateCard() {
  async function create(card) {
    try {
      const res = await axios.post(API, card);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }
  return { create };
}

export function useDeleteCard() {
  async function remove(id) {
    try {
      const res = await axios.delete(`${API}/${id}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }

  return { remove };
}
