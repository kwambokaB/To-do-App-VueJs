<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import TopImage from './TopImage.vue';

const Dark = useDark();
const toggleDark = useToggle(Dark);

const todos = ref([])
const todo = ref('')
const all = ref(true)
const open = ref(false)
const completed = ref(false)

const todos_asc = computed(() => todos.value.sort((a, b) => {
  return a.createdAt - b.createdAt
}))

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {
  deep: true
})
const addTodo = () => {
  if (todo.value.trim() === '') {
    return
  }
  console.log('todo clicked')
  todos.value.push({
    content: todo.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime()
  })
}
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo)
}

const active = () => {
  todos.value = todos.value.filter(f => f.done !== false)
  open.value = true
  all.value = false
  completed.value = false
}
const getAll = () => {
  todos.value = JSON.parse(localStorage.getItem('todos'))
  open.value = false
  all.value = true
  completed.value = false
}
const getCompleted = () => {
  todos.value = todos.value.filter(f => f.done === false)
  open.value = false
  all.value = false
  completed.value = true
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

</script>

<template>
  <div class="bg-light-lightbg min-h-screen dark:bg-dark-darkbg">
    <TopImage />
    <div class="section-component-div">
      <div class="flex-row flex justify-between w-full items-center">
        <div class="text-light-very-light-grayish-blue font-bold text-5xl tracking-widest">TODO</div>
        <button
          class="py-2 bg-[url('/images/ICON-MOON.SVG')] dark:bg-[url('/images/ICON-SUN.SVG')] w-[50px] h-[50px] bg-no-repeat bg-cover"
          @click="toggleDark()">
        </button>
      </div>

      <div class="w-full flex flex-row items-center bg-light-lightbg dark:bg-dark-darkbglight rounded-md mt-8">
        <v-icon name="bi-circle" fill="hsl(234, 39%, 85%)" scale="3" class="text-light-very-light-gray pl-5" />

        <input type="text" placeholder="Create a new todo"
          class="py-6 outline-0 outline-none w-full rounded-md bg-light-lightbg border-0 focus:ring-0 dark:bg-dark-darkbglight px-5 placeholder:font-thin"
          v-model="todo" />

        <button class="px-3" @click="addTodo">
          <v-icon name="io-checkmark" fill="hsl(234, 39%, 85%)" scale="3" class="text-light-very-light-gray pl-5" />
        </button>
      </div>

      <div class="flex flex-col w-full shadow-xl rounded-md mt-8 dark:bg-dark-darkbglight">
        <div v-for="todo in todos_asc"
          class="w-full flex flex-row items-center bg-light-lightbg dark:bg-dark-darkbglight border-b-2 border-dark-grayish-blue rounded-md">

          <label class="text-light-very-light-gray pl-5">
            <input type="checkbox" v-model="todo.done"
              class="h-8 w-8 rounded-[50px] bg-transparent checked:bg-gradient-to-r from-from to-to focus:outline-none focus:ring-0 border-dark-light-grayish-blue border-2" />
          </label>


          <div class="text-div">
            {{ todo.content }}
          </div>

          <button class="bg-[url('/images/ICON-CROSS.SVG')] px-5 h-8 w-8 bg-no-repeat"
            @click="removeTodo(todo)"></button>
        </div>


        <div
          class="w-full flex flex-row items-center justify-between bg-light-lightbg dark:bg-dark-darkbglight border-b-2 border-dark-grayish-blue rounded-md py-3 px-5">

          <div class="flex flex-row items-center w-full">
            <div class="bottom-text">{{ todos.length }} items left</div>
          </div>

          <div class="flex flex-row items-center  justify-between w-full px-2">
            <div class="bottom-text" @click="getAll">All</div>
            <div class="bottom-text" @click="active">Active</div>
            <div class="bottom-text" @click="getCompleted">Completed</div>
          </div>

          <div class="flex w-full justify-end">
            <div class="bottom-text">Clear completed</div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

