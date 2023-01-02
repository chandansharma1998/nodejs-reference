const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req,res) => {
     //display home and about pages on req to / and /about
    // if(req.url === '/'){
      
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'),
    //         (err, content) =>{
    //             if(err)throw err
    //             res.writeHead(200 , {'Content-Type':'text/html'})
    //             res.end(content)
    //         }
    //     )
       
    // }

    // if(req.url === '/about'){
       
    //      fs.readFile(path.join(__dirname, 'public', 'about.html'),
    //          (err, content) =>{
    //              if(err)throw err
    //              res.writeHead(200 , {'Content-Type':'text/html'})
    //              res.end(content)
    //          }
    //      )
        
    //  }

    //  if(req.url === '/api/users'){
       
    //     const users = [
    //         {name:"John Doe", age:30},
    //         {name:"Jane Doe", age:23}
    //     ]
    
    //     res.writeHead(200 , {'Content-Type':'application/json'})
    //     res.end(JSON.stringify(users))
        
    // }


    //make url, content type and requests dynamic

    //build file path
    const filePath = path.join(__dirname, 'public', req.url === '/'? 'index.html':req.url)
 
    //extension name
    const extName = path.extname(filePath)

    //initial content type
    const contentType = 'text/html'

    switch(extName){
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
    }

    fs.readFile(filePath , (err, content) =>{
        if(err){
            if(err.code === 'ENOENT'){
                //page not found
                fs.readFile(path.join(__dirname, 'public' , '404.html'), (err,content)=>{
                    res.writeHead(200, {'Content-Type':'text/html'})
                    res.end(content,'utf-8')
                })
            }
            else{
                //some server error
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        }
        else{
            //Success
            res.writeHead(200, {'Content-Type':contentType})
            res.end(content,'utf-8')
        }
    })

    



})

const PORT = process.env.PORT || 5000

server.listen(PORT , ()=>console.log(`Server running on port ${PORT}`))
