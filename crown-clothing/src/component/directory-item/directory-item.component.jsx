import "./directory-item.styles.scss"
const DirectoryItem=({category})=>{
    const {title, id, imageUrl}=category
return(
    <div key={id} className="directory-item-container">
          <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
          }} />
          <div className="body">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
)
}

export default DirectoryItem