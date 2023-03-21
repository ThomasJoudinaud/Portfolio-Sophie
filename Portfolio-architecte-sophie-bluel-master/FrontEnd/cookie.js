// Créer des cookie avec timer en jour
export function setCookie (name, value, days){
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    let expires = "expires=" + date.toUTCString()
    document.cookie = `${name}=${value}; ${expires}; path=/`
  }