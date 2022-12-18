import "./directory.styles.scss"
import Category from "../category-item/category-item.component"

const Directory =({catagories})=>{
    return (
        <div className="directory-container">
          {catagories.map((category) => (
            <Category category={category} />
          ))}
        </div>
      );
}

export default Directory