import { ref, onMounted, computed } from "vue";

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

export function useWebShare(shareData: ShareData) {
  const isAvailable = ref<boolean>(false);
  const isSharing = ref<boolean>(false);
  const error = ref<string | null>(null);

  onMounted(() => {
    let available = false;

    const methodsAvailable =
      typeof navigator.share === "function" && navigator.canShare !== undefined;

    if (methodsAvailable) {
      available = navigator.canShare(shareData);
    }

    isAvailable.value = available;
  });

  const share = async () => {
    if (!isAvailable.value) {
      error.value = "Web Share API is not available or disabled.";
      return;
    }

    isSharing.value = true;
    try {
      await navigator.share(shareData);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isSharing.value = false;
    }
  };

  const isError = computed(() => !!error.value);

  return {
    isAvailable,
    share,
    isSharing,
    isError,
    error,
  };
}
