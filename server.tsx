// @deno-types="https://deno.land/x/servest@v1.3.4/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import * as servest from "https://deno.land/x/servest@v1.3.4/mod.ts";
const app = servest.createApp();

const addedColors: string[] = []

app.handle('/',async(req)=>{
    await req.respond({
        status:200,
        headers: new Headers({ 
            "content-type":"text/html; charset=UTF-8"
        }),
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>EJERCICIO DENO</title>
                </head>
                <body>
                    <form action="/color" method="post">
                        <label>
                            Color a Ingresar:
                            <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    
                    
                    <ul>
                        {addedColors.map(color => {
                            return <li style={{color:color,backgroundColor:"black"}}>{color}</li>
                        })}
                        
                    </ul>
                    
                </body>
            </html>
        )
    })
})
app.post('/color',servest.contentTypeFilter("application/x-www-form-urlencoded"),async (req)=>{
    const form = await req.formData();
    const color = String(form.value("name"))
    addedColors.push(color)
    await req.redirect('/')
})

app.listen({port:8080})
