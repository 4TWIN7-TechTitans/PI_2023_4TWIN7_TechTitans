

const photo = (props) => {
  return (
   
    <img src={require( `${props.imageSource}`)} alt={props.imageAlt} />
  
  
  )
}

export default photo
