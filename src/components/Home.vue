<template>

  <div class="container">

    <div class="header">

        <img id="logo" src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small@2x.png" alt="logo">

        <div class="inputs">
          <input id="input" type="text" v-model="request" placeholder="Rechercher" v-on:keyup.enter="requestFacts()"/>

          <div class="buttons">
            <button v-on:click="requestFacts()">Rechercher</button>
            <button v-on:click="requestRandom()">J'ai de la chance</button>
          </div>
        </div>

    </div>

    <div class="results" v-if="results">

      <div class="result" v-for="result in results" v-if="results.length">
        <div class="fact">{{ result.value }}</div>
        <a class="url" :href="result.url">{{ result.url }}</a>
        <div class="category">Catégories: <span class="cat" v-for="category in result.category">{{ category }} </span></div>
      </div>

      <div class="empty" v-if="!results.length">
        Pas de résultat
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    let vm = this
    return {
      results: null,
      request: '',
      requestFacts: function () {
        if (vm.request.length) {
          this.$http.get('https://api.chucknorris.io/jokes/search?query=' + vm.request)
            .then(
              function (response) {
                if (response.body.total > 0) {
                  vm.results = response.body.result.slice(0, 15)
                } else {
                  vm.results = []
                }
              }
            )
        } else {
          vm.requestRandom()
        }
      },
      requestRandom: function () {
        vm.request = ''
        this.$http.get('https://api.chucknorris.io/jokes/random')
          .then(
            function (response) {
              vm.results = [response.body]
            }
          )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    background-color: #fafafa;
    padding: 16px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
  }
  #logo{
    height: auto;
    width: 200px;
  }
  .inputs{
    margin-left: 32px;
    flex: auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
  }
  .buttons{
    margin-top: 8px;
  }
  #input{
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    border-radius: 2px;
    height: 44px;
    border: none;
    font: 16px arial,sans-serif;
    font-weight: 500;
    line-height: 34px;
    padding-left: 16px;
  }
  #input:focus{
    border: none;
    outline: 0;
  }
  button{
    height: 36px;
    line-height: 27px;
    background-color: #f2f2f2;
    border: 1px solid #f2f2f2;
    border-radius: 2px;
    color: #757575;
    font-family: arial,sans-serif;
    font-size: 13px;
    font-weight: bold;
    margin: 11px 4px;
    min-width: 54px;
    padding: 0 16px;
    text-align: center;
  }
  button:first-child{
    margin-left: 0;
  }
  button:focus{
    outline: 0;
  }
  button:hover{
    cursor: pointer;
    border: 1px solid #c6c6c6;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
    color: #222;
    background-image: -webkit-linear-gradient(top,#f8f8f8,#f1f1f1);
  }

  .results{
    text-align: left;
    padding: 16px 0;
    margin-left: 248px;
    margin-bottom: 16px;
    max-width: 800px;
  }
  .result{
    font-family: arial,sans-serif;
    margin-top: 16px;
  }
  .fact{
    font-size: 18px;
    color: #1a0dab;
    margin-bottom: 4px;
  }
  .url{
    color: #006621;
  }
  .category{
    margin-top: 8px;
    color: #545454;
  }
  .cat{
    font-weight: bold;
  }

</style>
