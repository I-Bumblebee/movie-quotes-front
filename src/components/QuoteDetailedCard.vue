<script setup lang="ts">
import type { DetailedQuote } from "@/types/quoteTypes";
import IconsHeart from "@/components/icons/IconsHeart.vue";
import IconsComment from "@/components/icons/IconsComment.vue";
import CommentCard from "@/components/CommentCard.vue";
import useUserAuthStore from "@/stores/userAuth";
import { ref } from "vue";
import {
  addComment as addCommentApi,
  likeQuote,
  unlikeQuote,
} from "@/services/api/quote";

const props = defineProps<{
  quote: DetailedQuote;
}>();

const store = useUserAuthStore();
const comments = ref(props.quote.comments);
const liked = ref(props.quote.liked);
const likesCount = ref(props.quote.likes_count);
const newComment = ref<string>("");
const commentsCount = ref(props.quote.comments_count);

const addComment = () => {
  if (!newComment.value || !store.user) return;
  comments.value.push({
    comment: newComment.value,
    user: store.user,
  });
  addCommentApi(props.quote.id, newComment.value);
  commentsCount.value++;
  newComment.value = "";
};

const toggleLike = () => {
  if (!store.user) return;
  if (liked.value) {
    unlikeQuote(props.quote.id);
    likesCount.value--;
  } else {
    likeQuote(props.quote.id);
    likesCount.value++;
  }
  liked.value = !liked.value;
};
</script>

<template>
  <div
    class="box-content flex max-w-4xl flex-col gap-4 rounded-xl bg-cinder px-9 py-7 text-xl laptop:p-6"
  >
    <div class="flex items-center gap-6">
      <img
        :src="props.quote.user.image"
        class="h-10 w-10 rounded-full laptop:h-13 laptop:w-13"
        alt="profile picture"
      />
      {{ props.quote.user.name }}
    </div>
    <slot>
      <p>
        "{{ props.quote.quote }}"
        <span class="whitespace-nowrap">
          movie-
          <span class="font-medium text-almond">
            {{ props.quote.movie.title }}
          </span>
          ({{ props.quote.movie.release_year }})
        </span>
      </p>
    </slot>
    <img
      :src="props.quote.image"
      alt="quote cover image"
      class="mt-2.5 h-52 w-full rounded-lg object-cover object-center laptop:h-lg"
    />
    <div class="flex gap-6">
      <span class="flex items-center gap-3 text-2xl">
        {{ commentsCount }}
        <IconsComment />
      </span>
      <button @click.stop="toggleLike" class="flex items-center gap-3 text-2xl">
        {{ likesCount }}
        <IconsHeart :class="liked ? 'fill-crimson' : 'fill-white'" />
      </button>
    </div>
    <hr class="w-full border-0 border-b border-b-whitesmoke/30" />
    <div v-if="comments?.length > 0" class="flex flex-col gap-6">
      <CommentCard
        v-for="comment in comments"
        :key="comment.user.name"
        v-bind="comment"
      />
    </div>
    <div v-if="store.user" class="flex items-center gap-4 laptop:mb-4">
      <img
        :src="store.user.image"
        class="h-10 w-10 rounded-full laptop:h-13 laptop:w-13"
        alt="profile picture"
      />
      <form @submit.prevent="addComment" class="w-full">
        <input
          v-model="newComment"
          class="w-full rounded-lg-plus bg-bastille px-5 py-2 text-base placeholder-gray-400 outline-none laptop:py-3 laptop:text-xl"
          name="comment"
          type="text"
          placeholder="Write a comment"
        />
      </form>
    </div>
  </div>
</template>
