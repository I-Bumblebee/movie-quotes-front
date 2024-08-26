import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export function useSearchBar() {
  const active = ref(false);
  const inputRef = ref<HTMLInputElement | null>(null);
  const inputText = ref("");
  const router = useRouter();
  const timer = ref<NodeJS.Timeout | null>(null);

  watch(inputText, () => {
    const input = inputText.value.trim();
    if (timer.value) {
      clearTimeout(Number(timer.value));
    }
    timer.value = setTimeout(() => {
      if (input.startsWith("@")) {
        router.push({ query: { "filter[title]": input.slice(1) } });
      } else if (input.startsWith("#")) {
        router.push({ query: { "filter[quote]": input.slice(1) } });
      } else {
        router.push({ query: { "filter[title]": input.trim() } });
      }
    }, 550);
  });

  const focusInput = () => {
    if (inputRef.value) {
      (inputRef.value as HTMLInputElement).focus();
    }
  };

  return {
    active,
    inputRef,
    inputText,
    focusInput,
  };
}
