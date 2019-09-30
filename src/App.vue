<template>
  <div>
    <div>
      <input v-model="item.name" type="text">
      <input v-model="item.age" type="text">
      <input v-model="item.class" type="text">
      <button @click="save">保存</button>
    </div>
    <ul class="user-list">
      <li v-for="(item, idx) in userList" :key="item.id">
        <div>{{item.name}}</div>
        <div>{{item.age}}</div>
        <div>{{item.class}}</div>
        <div>
          <button @click="editUser(idx)">编辑</button>
          <button @click="delUser(idx)">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      item: {
        id: '',
        name: '',
        age: '',
        class: ''
      },
      edit: false
    }
  },
  mounted () {
    console.log(process.env.BASE_API)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.get('/user', null)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userList = res.data
          console.log(this.userList)
        }
      })
    },
    editUser(i) {
      this.item = this.userList[i]
      this.edit = true
    },
    delUser(i) {
      let item = this.userList[i]
      this.$http.delete('user', {id: item.id})
      .then(res => {
        console.log(res)
      })
    },
    save() {
      if (this.edit) {
        this.$http.post('/user', this.item)
        .then(res => {
          console.log(res)
          this.edit = false
        })
      } else {
        this.$http.put('/user', this.item)
        .then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .add {
    margin-bottom: 30px;
    font-size: 12px;
    color: #333;
    width: 100px;
    text-align: center;
    padding-left: 40px;
  }
  .user-list {
    list-style: none;
    font-size: 12px;
    color: #333;
    li {
      overflow: hidden;
      margin-bottom: 20px;
      div {
        float: left;
        min-width: 100px;
        text-align: center;
        button {
          margin-right: 10px;
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>