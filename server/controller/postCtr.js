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
    res.status(200).json({
      postList: posts,
    });
    // {postList: posts}
  },

  //게시물 세부 내용 보여줌
  detail: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({
      post: post,
    });
  },

  //기존에 데이터 전송
  updateLayout: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({ post: post });
  },

  //게시물 업데이트
  update: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      await Post.findByIdAndUpdate(
        id,
        { title: title, content: content },
        { new: true }
      );
      res.status(200).send("update 완료");
    } catch (error) {
      res.status(500).send("update 실패");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).send("삭제완료");
    } catch (error) {
      res.status(500).send("삭제 실패");
    }
  },
};

module.exports = postCtr;
