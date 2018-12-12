<template>
  <div class="hello">
    <el-col :span="10">
      <el-card>
        <el-form>
          <el-form-item label="Pet Type">
            <el-input v-model="petType"></el-input>
            {{petType}}
          </el-form-item>
          <el-form-item label="Pet Size">
            <el-input v-model="petSize"></el-input>
          </el-form-item>
          <el-form-item label="Pet Color">
            <el-input v-model="petColor"></el-input>
          </el-form-item>
          <el-form-item label="Availability">
            <el-input v-model="petAvailability"></el-input>
          </el-form-item>
          <el-button type="primary" @click="savePet()">Save</el-button>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="10" :offset="4">
      <el-card>
        <div v-for="(pet, key) in allPets" :key="key">
          <h3>{{pet.petType}}</h3>
          <el-button type="primary" @click="showPet(pet._id)">View It</el-button>
          <el-button type="danger" @click="deletePet(pet._id)">Delete</el-button>
        </div>
      </el-card>
    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      albums: null,
      allPets: null,
      petType: null,
      petColor: null,
      onePet: {},
      petSize: null,
      petAvailability: null
    }
  },
  mounted () {
    this.getPets()
  },
  methods: {
    getPets () {
      axios.get('http://localhost:8081/pet').then((res) => {
        this.allPets = res.data.pets
      })
    },
    showPet (value) {
      axios.get('http://localhost:8081/pet/' + value).then((res) => {
        this.onePet = res.data.pet
        this.getPets()
      })
    },
    deletePet (value) {
      axios.get('http://localhost:8081/pet/delete/' + value).then((result) => {
        console.log(result)
        this.getPets()
      },
      (err) => {
        console.log(err, 'there is error')
      })
    },
    savePet () {
      axios.post('http://localhost:8081/pet', {
        petType: this.petType,
        availability: this.petAvailability,
        color: this.petColor,
        size: this.petSize
      }).then((response) => {
        console.log(response)
        this.getPets()
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
