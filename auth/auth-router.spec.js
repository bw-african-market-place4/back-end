const server = require('../api/server.js');

const supertest = require('supertest');

const db = require("../data/dbConfig");





it('should operate in testing ', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  });




 afterAll(async () => {
  
    await db.migrate.rollback()
    .then(()=> db.migrate.latest())
    .then(()=> db.seed.run())
  })

 

//auth

         describe('POST /register', () => {
            it('should return status 201', async () => {

                const response = await supertest(server).post('/api/auth/register')
                .send({username:"hello", password:"hello345", email:"hello@email.com", name:"George", businessName:"Sunny Kitchen", terms:true})

                 expect(response.status).toBe(201);
              
           
              }) 
             
         })

         describe('POST /register', () => {
            it('return status 400 if nothing is sent', async () => {

                const response = await supertest(server).post('/api/auth/register')

                 expect(response.status).toBe(400);
              
              
              }) 
             
         })

         
        describe('POST /login', () => {
            it('should return status 200', async () => {

                const response = await  supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})

                 expect(response.status).toBe(200);
              
        
                
              }) 
             
         })
         describe('POST /login', () => {
            it('should return status 401 if not authenticated user', async () => {

                const response = await  supertest(server).post('/api/auth/login').send({username:"someone", password:"new123"})

                 expect(response.status).toBe(401);
              
                
              }) 
             
         })

      
         //item-router

         describe('GET /items', async () => {
             
            it('should return an array', async () => {
                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
        
                const res = await  
                supertest(server).get('/api/items').set("Authorization", response.body.token)
                 expect(Array.isArray(res.body.items)).toBe(true);
                
                
            
              }) 
         })

         describe('GET /items', async () => {
            it('should return an array with 7 elements', async () => {
                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
                const res = await
                supertest(server).get('/api/items').set("Authorization", response.body.token)
                expect(res.body.items).toHaveLength(7);
                })
        
            })

            describe('GET /items/:id', async () => {
                it('should return status 200 and item name cereal', async () => {
                    const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
                    const res = await
                    supertest(server).get('/api/items/1').set("Authorization", response.body.token)
                    expect(res.status).toBe(200);
                    expect(res.body.item.name).toBe("cereal");
                    })
            
                })
     
            describe('POST /items', () => {
                it('should return status 201', async () => {
                    const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})

                    const res = await  supertest(server).post('/api/items').set("Authorization", response.body.token).send({location:"Los Angeles", name:"laptop", description:"hello", price:200, userId:8})
    
                     expect(res.status).toBe(201);
                     
                    
                  }) 
                 
             })

                   
         describe('POST /items', () => {
            it('should return location Irvine', async () => {


                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})

                const item = await  supertest(server).post('/api/items').set("Authorization", response.body.token).send({location:"Irvine", name:"burger", description:"", price:5, userId:8})
                expect(item.status).toBe(400);
                
              }) 
             
         })
    
         describe('PUT /items/:id', () => { 
            it('should return status 200 and name burger', async () => {

                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})

                const item = await  supertest(server).put('/api/items/8').set("Authorization", response.body.token).send({id: 8, location:"Irvine", name:"burger", description:"hello", price:5, userId:8})

                 expect(item.status).toBe(200);
                 expect(item.body.updatedItem.name).toBe("burger");
                
              }) 
             
         })

         describe('PUT /items/:id', () => {
            it('should return status 404', async () => {

                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})

                const item = await  supertest(server).put('/api/items/25').set("Authorization", response.body.token).send({id: 25, location:"Irvine", name:"burger", description:"hello", price:5, userId:8})

                 expect(item.status).toBe(404);
                
              }) 
             
         })

         describe('DELETE /items/:id', () => {
            it('should return status 200 and length of array after deleting', async () => {
                
                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
                const item = await  supertest(server).delete('/api/items/8').set("Authorization", response.body.token)

                 expect(item.status).toBe(200);

                 const res = await supertest(server).get("/api/items").set("Authorization", response.body.token)
                 expect(res.body.items).toHaveLength(7);
                      }) 
         }) 

         //user router

         describe('GET /users', async () => {
             
            it('should return an array with 7 elements', async () => {
                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
        
                const res = await  
                supertest(server).get('/api/users').set("Authorization", response.body.token)
                 expect(Array.isArray(res.body.users)).toBe(true);
                 expect(res.body.users).toHaveLength(8);
                
            
              }) 
         })


         
         describe('GET /users/:id', async () => {
            it('should return status 200 and name Monkey D. Luffy', async () => {
                const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
                const res = await
                supertest(server).get('/api/users/4').set("Authorization", response.body.token)
                expect(res.status).toBe(200);
                expect(res.body.user.name).toBe("Monkey D. Luffy");
                })
        
            })

            describe('GET /users/:id/items', async () => {
                it('should return status 200 and array length of 3', async () => {
                    const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
                    const res = await
                    supertest(server).get('/api/users/1/items').set("Authorization", response.body.token)
                    expect(res.status).toBe(200);
                    expect(res.body.data).toHaveLength(3);
                    })
            
                })
    

                describe('POST /users/:id/items', () => {
                    it('should return status 201', async () => {
                        const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
    
                        const res = await  supertest(server).post('/api/users/8/items').set("Authorization", response.body.token).send({location:"Paris", name:"cup", description:"ready", price:3})
        
                         expect(res.status).toBe(201);
                         
                        
                      }) 
                     
                 })

                 describe('PUT /users/:id/items', () => {
                    it('should return status 200 and item name bbq', async () => {
        
                        const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
        
                        const item = await  supertest(server).put('/api/users/8/items/9').set("Authorization", response.body.token).send({location:"Fullerton", name:"bbq", description:"good", price:11})
        
                        expect(item.status).toBe(200);
                        expect(item.body.updatedItem.name).toBe("bbq");
                        
                      }) 
                     
                 })      

                 describe('DELETE  /users/:id/items', () => {
                    it('should return status 200 and length of array after deleting', async () => {
                        
                        const response = await supertest(server).post('/api/auth/login').send({username:"hello", password:"hello345"})
                        const item = await  supertest(server).delete('/api/users/8/items/9').set("Authorization", response.body.token)
        
                         expect(item.status).toBe(200);
        
                         const res = await supertest(server).get("/api/items").set("Authorization", response.body.token)
                         expect(res.body.items).toHaveLength(7);

                              }) 
                 }) 
//logout
                    describe('GET /logout', () => {
            it('should return status 204', () => {
                return (
                supertest(server).get('/api/auth/logout').then(response => {
                    expect(response.status).toBe(204);
                })
                );
              }) 
         })
         
        