async function init () {
    const node = document.querySelector("#type-text")
    
    await sleep1(1000)
    node.innerText = ""
    
      await node.type('Escull ')
      await node.type('La teva aventura')
      await sleep1(2000)
      await node.delete('La teva aventura')
      await node.type('El teu camí')
      await sleep1(2000)
      await node.delete('El teu camí')
      await node.delete('Escull ')
      await sleep1(2000)
      await node.type("Escull la teva aventura")
    
}
  
  
  const sleep1 = time => new Promise(resolve => setTimeout(resolve, time))
  
  class TypeAsync extends HTMLSpanElement {
    get typeInterval () {
      const randomMs = 100 * Math.random()
      return randomMs < 50 ? 10 : randomMs
    }
    
    async type (text) {
      for (let character of text) {
        this.innerText += character
        await sleep1(this.typeInterval)
      }
    }
    
    async delete (text) {
      for (let character of text) {
        this.innerText = this.innerText.slice(0, this.innerText.length -1)
        await sleep1(this.typeInterval)
      }
    }
  }
  
  customElements.define('type-async', TypeAsync, { extends: 'span' })
  
  
  setTimeout(function(){init()},4000)
  