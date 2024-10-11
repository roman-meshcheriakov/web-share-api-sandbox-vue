<template>
  <div style="padding: 20px;">
    <h1>Web Share API Test</h1>

    <div v-if="isAvailable">
      <button @click="share" :disabled="isSharing">
        {{ isSharing ? 'Sharing...' : 'Share this page' }}
      </button>
      <p v-if="isError" style="color: red;">Error: {{ error }}</p>
    </div>

    <p v-else>Web Share API is not available in your browser.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWebShare } from './hooks/useWebShare.ts';

export default defineComponent({
  setup() {
    const { isAvailable, share, isSharing, isError, error } = useWebShare({
      title: 'My Awesome Page',
      text: 'Check out this cool page!',
      url: window.location.href,
    });

    return {
      isAvailable,
      share,
      isSharing,
      isError,
      error,
    };
  },
});
</script>
