
interface CardProps {
    title: string,
    link: string
}
export const Card = (CardProps) => {
    const link = CardProps.link;
    const updatedLink = link.replace("youtu.be","www.youtube.com/embed")
    console.log(updatedLink)
    return(
        <div className="bg-primary border-[1px] border-neutral-300 rounded-lg min-h-56 h-full max-w-[364px] p-4">
            <div className="text-xl font-medium tracking-tighter text-neutral-900">{CardProps.title}</div>
            <div className="w-full  mt-2">
                <iframe width="560" height="315" className="w-full flex rounded-sm "  
                src={updatedLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                
            </div>
        </div>
    )
}

//https://www.youtube.com/watch?v=Eb7nBCG4r1M
//https://youtu.be/Eb7nBCG4r1M?si=cRBTl5F5qjQBiyJi
//https://www.youtube.com/embed/Eb7nBCG4r1M?si=cwmB8Fn8I2VOtKep