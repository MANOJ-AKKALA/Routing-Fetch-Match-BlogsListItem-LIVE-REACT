import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      author: data.author,
      avatarUrl: data.avatar_url,
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      id: data.id,
      topic: data.topic,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  render() {
    const {blogData, isLoading} = this.state
    const {content, imageUrl, title, avatarUrl, author} = blogData
    return (
      <div className="blog-content blog-container ">
        {isLoading ? (
          <Loader type="Bars" color="Orange" height={50} width={50} />
        ) : (
          <div className="blog-container ">
            <h1 className="blog-details-title">{title}</h1>
            <img className="author-pic" src={avatarUrl} alt={author} />
            <p>{author}</p>
            <img className="blog-image" src={imageUrl} alt={title} />
            <p>{content}</p>
          </div>
        )}
      </div>
    )
  }
}

export default BlogItemDetails
