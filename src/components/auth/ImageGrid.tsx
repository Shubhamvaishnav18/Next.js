import Image from "next/image";

const ImageGrid = () => {
  return (
    <div className="relative w-full h-full p-8">
      <Image
        src="/images/register.png" 
        alt="Register Visual"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default ImageGrid;
