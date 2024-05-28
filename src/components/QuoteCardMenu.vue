<script setup lang="ts">
import IconsEyeOpen from "@/components/icons/IconsEyeOpen.vue";
import IconsPencil from "@/components/icons/IconsPencil.vue";
import IconsTrashCan from "@/components/icons/IconsTrashCan.vue";

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "edit"): void;
  (e: "show"): void;
  (e: "close"): void;
}>();

</script>

<template>
  <div
    v-click-outside="() => emit('close')"
    class="flex w-60 flex-col gap-8 rounded-lg-plus bg-bastille py-8"
  >
    <button @click="emit('show')" class="flex items-center gap-4 pl-10">
      <IconsEyeOpen class="h-5 w-5" />
      {{$t("quote_card_menu.view_quote")}}
    </button>
    <button @click="emit('edit')" class="flex items-center gap-4 pl-10">
      <IconsPencil class="fill-white" />
      {{$t("quote_card_menu.edit")}}
    </button>
    <button @click="emit('delete')" class="flex items-center gap-4 pl-10">
      <IconsTrashCan />
      {{$t("quote_card_menu.delete")}}
    </button>
  </div>
</template>
