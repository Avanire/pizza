import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={475}
        viewBox="0 0 280 475"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="136" cy="145" r="130" />
        <rect x="0" y="334" rx="10" ry="10" width="280" height="76" />
        <rect x="0" y="430" rx="0" ry="0" width="91" height="27" />
        <rect x="127" y="422" rx="25" ry="25" width="151" height="44" />
        <rect x="0" y="292" rx="0" ry="0" width="280" height="30" />
    </ContentLoader>
)

export default Skeleton

