'use client';

import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-start">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_100%]" />

            <div
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[64px] h-[64px] 
  bg-[radial-gradient(circle,#494955_0%,#141414_70%)]
  rounded-full blur-[10px] opacity-50"
            />

            <div
                className="absolute top-80 left-30 w-[130px] h-[130px] 
  bg-[radial-gradient(circle,#494955_30%,#141414_90%)]
  rounded-full blur-[10px] opacity-40"
            />

            <div
                className="absolute top-70 right-40 w-[96px] h-[96px] 
  bg-[radial-gradient(circle,#494955_30%,#141414_90%)]
  rounded-full blur-[10px] opacity-40"
            />

            <div className="relative z-10 text-center max-w-7xl px-6 mt-28">

                <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                    <Image
                        src="/images/content-bg.png"
                        alt="Blur Background"
                        width={600}
                        height={400}
                        className="opacity-90 blur-xl"
                        priority
                    />
                </div>

                <h1 className="text-5xl md:text-3xl lg:text-5xl font-extrabold text-white leading-tight">
                    Beautiful Landing Page
                    <br />
                    Design for You
                </h1>

                <p className="mt-3 text-lg md:text-md text-[#9E9E9E] max-w-lg mx-auto">
                    A good design is not only aesthetically pleasing, but also functional.
                    It should be able to solve the problem.
                </p>

                <Link
                    href="/dashboard"
                    className="inline-block mt-6 px-12 py-3 rounded-[5px] text-white font-medium
    bg-[linear-gradient(135deg,#FF9898_0%,#8054FF_100%)]
    shadow-[0_0_40px_rgba(128,84,255,0.4)]
    hover:scale-105 transition-all duration-300"
                >
                    Dashboard
                </Link>

            </div>

            <div className="relative z-10 mt-20 md:mt-24 mb-32 md:mb-40 w-full max-w-4xl px-4 md:px-6">

                <div className="bg-[#131415] rounded-[20px] p-4 md:p-8 
  border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)]">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                        <div className="bg-[#222228] rounded-[28px] p-6 md:p-8 
      md:col-span-1 md:row-span-2 
      h-auto md:h-[490px] flex flex-col justify-between">

                            <div>
                                <div className="flex justify-center mb-6">
                                    <Image
                                        src="/images/logo-dashboard.png"
                                        alt="Top Logo"
                                        width={41}
                                        height={33}
                                    />
                                </div>

                                <div className="h-[1px] bg-white/10 mb-6" />

                                <div className="space-y-4 md:space-y-6">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <Image
                                                src="/images/loading-img.png"
                                                alt="Blur"
                                                width={140}
                                                height={70}
                                                className="w-full max-w-[160px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <Image
                                    src="/images/dashboard-profile.png"
                                    alt="Profile"
                                    width={90}
                                    height={110}
                                />
                            </div>
                        </div>

                        <div className="bg-[#222228] rounded-[28px] p-6 h-auto md:h-[230px] flex items-center justify-center">
                            <Image
                                src="/images/circle-loading.png"
                                alt="blur"
                                width={180}
                                height={140}
                                className="w-full max-w-[200px]"
                            />
                        </div>

                        <div className="bg-[#222228] rounded-[28px] p-6 h-auto md:h-[260px] flex flex-col justify-center space-y-4 md:space-y-6">
                            <Image
                                src="/images/loading.png"
                                alt="blur"
                                width={160}
                                height={100}
                            />

                            {[1, 2, 3].map((i) => (
                                <Image
                                    key={i}
                                    src="/images/user.png"
                                    alt="blur"
                                    width={140}
                                    height={90}
                                />
                            ))}
                        </div>

                        <div className="bg-[#222228] rounded-[28px] p-6 h-auto md:h-[200px] flex flex-col justify-between">
                            <Image
                                src="/images/loading.png"
                                alt="square"
                                width={180}
                                height={40}
                            />

                            <div className="h-[1px] bg-white/10 my-4" />

                            <div className="flex items-end justify-center">
                                <Image
                                    src="/images/anlytic.png"
                                    alt="Analytics"
                                    width={200}
                                    height={120}
                                />
                            </div>
                        </div>

                        <div className="bg-[#222228] rounded-[20px] p-6 h-[150px] md:h-[200px]" />

                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full pointer-events-none">
                <Image
                    src="/images/layer.png"
                    alt="Gradient Layer"
                    width={1920}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                />
            </div>

        </section>
    );
};

export default Hero;