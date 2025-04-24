export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, {event}) => {
    //html template object representation
    //console.log(html)
    html. head.push('<meta name="endless" content="Create your worlds" />')
  })

  nitroApp.hooks.hook('render:response', (response, {event}) => {
    console.log('RENDER-RESPONSE->', response)
  })
})
