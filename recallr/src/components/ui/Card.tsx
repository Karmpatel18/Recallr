export const Card = () => {
    return(
        <div className="bg-primary border-[1px] border-neutral-300 rounded-lg min-h-56 h-full max-w-[364px] p-4">
            <div className="text-xl font-medium tracking-tighter text-neutral-900">Welcome, back user</div>
            <div className="w-full  mt-2">
                <iframe width="560" height="315" className="w-full flex rounded-sm "  src="https://www.youtube.com/embed/MzxXmjiE76E?si=39WFEDdvEIRrA7xe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            
        </div>
    )
}