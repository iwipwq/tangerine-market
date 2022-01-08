const Post = require("../model/post");

const formatDate = (date) => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }

  if (day.length < 2) {
    day = "0" + month;
  }
  return [year, month, day].join("-");
};

const postCtr = {
  //게시물 추가 기능
  upload: async (req, res) => {
    const { title, content } = req.body;
    const image = req.file.location;
    const publishedDate = formatDate(new Date());
    const post = new Post({
      title: title,
      content: content,
      image: image,
      publishedDate: publishedDate,
    });
    try {
      await post.save();
      res.status(200).send("upload 성공");
    } catch (error) {
      res.status(500).send("upload 실패");
    }
  },

  //게시물 전체를 보여주는 코드
  list: async (req, res) => {
    const posts = await Post.find({});
    // {postList: posts}
  },

  //게시물 세부 내용 보여줌
  detail: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    // {post: post}
  },
};

module.exports = postCtr;
