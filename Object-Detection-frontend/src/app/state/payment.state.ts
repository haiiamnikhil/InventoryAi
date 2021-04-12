
let data = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : ''

export const selectedPackage = {
    package:data.package ? data.package : 'Basic',
    amount:data.amount ? data.amount : 50,
}