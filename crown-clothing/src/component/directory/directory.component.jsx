import "./directory.styles.scss"
import DirectoryItem from "../directory-item/directory-item.component"

const Directory =({catagories})=>{
    return (
        <div className="directory-container">
          {catagories.map((category) => (
            <DirectoryItem category={category} />
          ))}
        </div>
      );
}

export default Directory