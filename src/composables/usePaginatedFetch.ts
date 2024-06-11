import { onBeforeMount, ref, type Ref, type UnwrapRef, watch } from "vue";
import type { AxiosResponse } from "axios";
import type { PaginatedResponse } from "@/types";

export function usePaginatedFetch<T>(
  fetchFunction: (
    page: number,
    movieSearchParam: string,
    quoteSearchParam: string,
  ) => Promise<unknown>,
  movieSearchParam?: Ref<string>,
  quoteSearchParam?: Ref<string>,
) {
  const items = ref<T[]>([]);
  const page = ref(1);
  const lastPage = ref(1);
  const loading = ref(false);

  const fetchItems = (
    mode: "extend" | "replace",
    resetPage: boolean = false,
  ) => {
    if (resetPage) {
      page.value = 1;
    }
    loading.value = mode === "replace";

    fetchFunction(
      page.value,
      movieSearchParam?.value || "",
      quoteSearchParam?.value || "",
    )
      .then((response) => {
        const { data } = response as AxiosResponse<PaginatedResponse<T>>;
        if (mode === "replace") {
          items.value = data.data as UnwrapRef<T[]>;
        } else {
          items.value = [...items.value, ...(data.data as UnwrapRef<T[]>)];
        }
        lastPage.value = data.meta.last_page;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  onBeforeMount(() => {
    fetchItems("replace");
  });

  watch([movieSearchParam, quoteSearchParam], () => {
    fetchItems("replace", true);
  });

  const onReachEnd = () => {
    if (!loading.value && page.value < lastPage.value) {
      page.value++;
      fetchItems("extend");
    }
  };

  return {
    items,
    loading,
    onReachEnd,
  };
}
