<template>
  <div class="wrapper">
    <div class="timer">{{ timeLeft }}</div>
    <div class="trafficLight">
      <Light
          v-for="(light, index) in lights"
          :key="light.key"
          :color="light.color"
          :blinking="timeLeft < 3"
          :enabled="activeLightIndex === index"
      />
    </div>
  </div>
</template>

<script>
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getDataFromStorage, saveInStorage} from "@/utils";
import Light from "./Light";

export default {
  name: "TrafficLight",
  components: {
    Light
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const lights = [
      {
        key: "r",
        color: "red",
        time: 5
      },
      {
        key: "y",
        color: "yellow",
        time: 3
      },
      {
        key: "g",
        color: "green",
        time: 3
      }
    ];

    let {
      index,
      time: localStorageTime,
      reverse = false
    } = getDataFromStorage();


    const activeLightIndex = computed(() => {
      const {color} = route.params;

      if (color !== undefined) {
        const index = lights.findIndex(x => x.color === color);
        if (index !== -1) {
          return index;
        }
      }

      return 0;
    });

    const activeLightTime = computed(() => lights[activeLightIndex.value].time);

    const timeLeft = ref();

    timeLeft.value = index === activeLightIndex.value ? localStorageTime : activeLightTime.value;


    const shiftLightIndex = () => {

      if (activeLightIndex.value === 0) {
        reverse = false;
      }

      if (activeLightIndex.value === lights.length - 1) {
        reverse = true;
      }

      const index = reverse ? activeLightIndex.value - 1 : activeLightIndex.value + 1;

      router.push(`/${lights[index].color}`);

    }

    let timerId;

    const scheduleShiftLight = () => {

      clearInterval(timerId);
      timerId = setInterval(() => {
        timeLeft.value -= 1;
        console.log(timeLeft.value)

        if (timeLeft.value === 0) {
          shiftLightIndex();
        } else {
          saveInStorage(activeLightIndex.value, timeLeft.value, reverse);
        }


      }, 1000);
    }

    onMounted(() => scheduleShiftLight());

    onUnmounted(() => clearInterval(timerId));

    watch(() => route.params, () => {
      timeLeft.value = activeLightTime.value;
      scheduleShiftLight();
    });

    return {
      timeLeft,
      lights,
      activeLightIndex: activeLightIndex
    }
  }
}
</script>

<style scoped>

.wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.wrapper::after {
  content: "";
  order: 3;
  width: 6px;
  height: 160px;
  background-color: black;
}

.trafficLight {
  order: 2;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 2px solid black;
  background-color: rgba(0, 0, 0, 0.1);
}

.timer {
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1;
  padding: 8px 4px;
  margin-bottom: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}

</style>