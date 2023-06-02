export const formatearDinero = precio => {
    return precio.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}
