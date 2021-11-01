<template>
  <div class="light" :class="className"/>
</template>

<script>
import {computed} from "vue";

export default {
  name: "Light",
  props: {
    color: String,
    enabled: Boolean,
    blinking: Boolean
  },
  setup(props) {
    const className = computed(() => ({
      disabled: !props.enabled,
      [props.color]: props.enabled,
      blinking: props.blinking
    }));

    return {
      className
    }
  }
}
</script>

<style scoped>

.light {
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.light:last-child {
  margin-bottom: 0;
}

.disabled {
  background-color: whitesmoke;
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}

.blinking {
  animation: blinking 200ms alternate infinite;
}

@keyframes blinking {
  to {
    background-color: whitesmoke;
  }
}

</style>