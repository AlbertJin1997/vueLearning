<script setup>
import { ref, reactive, toRefs } from 'vue'

// 使用ref定义基本类型响应式数据
const count = ref(0)
const message = ref('Hello Reactive')

// 使用reactive定义对象类型响应式数据
const user = reactive({
  name: 'Vue',
  age: 3,
  address: {
    city: 'Frontend',
    country: 'JavaScript'
  }
})

// 将reactive对象转换为ref引用
const { name, age } = toRefs(user)

// 修改嵌套对象的方法
const updateAddress = () => {
  user.address.city = 'Vue City'
  user.address.country = 'Vue Land'
}
</script>

<template>
  <div class="reactive-container">
    <h1>响应式数据演示</h1>
    <p>Vue 3提供了ref和reactive两种方式来创建响应式数据。</p>

    <div class="feature-section">
      <h2>使用ref定义基本类型</h2>
      <p>Count: {{ count }}</p>
      <button @click="count++">增加</button>
      <p>Message: {{ message }}</p>
      <input v-model="message" placeholder="修改消息">
    </div>

    <div class="feature-section">
      <h2>使用reactive定义对象类型</h2>
      <p>Name: {{ user.name }}</p>
      <p>Age: {{ user.age }}</p>
      <button @click="user.age++">增加年龄</button>
      <p>City: {{ user.address.city }}</p>
      <p>Country: {{ user.address.country }}</p>
      <button @click="updateAddress">更新地址</button>
    </div>

    <div class="feature-section">
      <h2>使用toRefs</h2>
      <p>Name (via toRefs): {{ name }}</p>
      <p>Age (via toRefs): {{ age }}</p>
      <button @click="name.value = 'Vue 3'">修改名称</button>
    </div>
  </div>
</template>

<style scoped>
.reactive-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.feature-section {
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #535bf2;
}

input {
  padding: 0.5rem;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
</style>