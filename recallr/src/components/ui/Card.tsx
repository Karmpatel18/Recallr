

interface CardComponentProps {
    title: string;
    link: string;
}

export const Card: React.FC<CardComponentProps> = (CardProps: CardComponentProps) => {
    const link: string = CardProps.link;
    const updatedLink: string = link.replace("youtu.be", "www.youtube.com/embed");
    console.log(updatedLink);
    return (
        <div className="bg-primary border-[1px] border-neutral-300 rounded-lg min-h-56 h-full max-w-[364px] w-full p-4">
            <div className="text-xl font-medium tracking-tighter text-neutral-900">{CardProps.title}</div>
            <div className="w-full  mt-2">
                <iframe
                    width="560"
                    height="315"
                    className="w-full flex rounded-sm "
                    src={updatedLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

