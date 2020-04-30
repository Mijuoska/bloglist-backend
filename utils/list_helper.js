// Määrittele funktio mostBlogs joka saa parametrikseen taulukollisen blogeja. 
// Funktio selvittää kirjoittajan, kenellä on eniten blogeja. 
// Funktion paluuarvo kertoo myös ennätysblogaajan blogien määrän:


// const blogs = [{
//         _id: "5e9c669075bd6762a033a2c8",
//         title: "My first blog post",
//         author: "Miika",
//         url: "mkallasoja.net",
//         likes: 3,
//         __v: 0
//     },
//     {
//         _id: "5e9c669b75bd6762a033a2c9",
//         title: "My second blog post",
//         author: "Pauline",
//         url: "mkallasoja.net",
//         likes: 5,
//         __v: 0
//     }, {
//         _id: "5e9c80e2da611057a8533518",
//         title: "My third blog post",
//         author: "Miika",
//         url: "mkallasoja.net",
//         likes: 10,
//         __v: 0
//     }, {
//         _id: "5e9c8479e29c7161543a2d3a",
//         title: "My fourth blog post",
//         author: "Miika",
//         url: "mkallasoja.net",
//         likes: 12,
//         __v: 0
//     }]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)

}
const favoriteBlog = (blogs) => {
    let maxlikes = 0
   for (let i = 0; i < blogs.length; i++) {
       if (blogs[i].likes > maxlikes) {
           maxlikes = blogs[i].likes
       }
   }
     const { title, author, likes } = favBlog = blogs.find(blog => {
    return blog.likes === maxlikes
   });


   return { title: title, author: author, likes: likes }
}

 const mostBlogs = (blogs) => {
  // get a list of authors
    const authorsCount = []
    for (let i = 0; i < blogs.length; i++) {
        if (authorsCount.indexOf(blogs[i].author) < 0) {
            authorsCount.push(blogs[i].author)
        }
    }

    // get the number of blogs for each author
    const authorsArr = authorsCount.map(author => {
        authorObj = {author: author, blogs: 0}
        authorObj.blogs = blogs.filter(blog => {
            return blog.author === author
        }).length
        return authorObj
    })
// get the highest number of blogs
 let maxblogs = 0
 for (let i = 0; i < authorsArr.length; i++) {
     if (authorsArr[i].blogs > maxblogs) {
         maxblogs = authorsArr[i].blogs
     }
 }
// return author with highest number of blogs
     return authorsArr.filter((author) => {
           return author.blogs === maxblogs
     })[0];
    }

 const mostLikes = (blogs) => {
      const authorsCount = []
      for (let i = 0; i < blogs.length; i++) {
          if (authorsCount.indexOf(blogs[i].author) < 0) {
              authorsCount.push(blogs[i].author)
          }
      }
      console.log(authorsCount);
      

      const authorsArr = authorsCount.map(author => {
          const authorObj = {
              author: author,
              likes: 0
          }
          const authorsBlogs = blogs.filter((blog) => {
             return blog.author === author
          })
          
          console.log(authorsBlogs);
          

            authorObj.likes = authorsBlogs.reduce((sum, blog) => {
            return sum + blog.likes
          }, 0);
          
          
          return authorObj
      })

      
       let maxlikes = 0
       for (let i = 0; i < authorsArr.length; i++) {
           if (authorsArr[i].likes > maxlikes) {
               maxlikes = authorsArr[i].likes
           }
       }
       // return author with highest number of blogs
       return authorsArr.filter((author) => {
           return author.likes === maxlikes
       })[0];
       }
 

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}