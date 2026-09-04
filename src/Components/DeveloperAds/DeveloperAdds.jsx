import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa';

const DeveloperAdds = () => {
  return (
    <div className=''>
      <section
        className='relative text-gray-100 bg-cover bg-center '
        style={{
          backgroundImage:
            'url(https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/464391540_122096976932590648_6715325294574747546_n.png?stp=dst-png_s960x960&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFCJsn-x64FtE1moQKUNcbU6Qa435JMbRXpBrjfkkxtFdL9nQiCKPMr6Rspuuobg4FZSI_Tb9Pre7Xz592dfLSG&_nc_ohc=8s7TJnDuR1UQ7kNvwEgGCmC&_nc_oc=Adm5cGAWDH2au2DBdTjsWRtKwzmIABAAnrd9m60yMNa3O1crUSlKywZZG22ZadzmfvU&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=g1Rt-v9vggVtC2oqJmHP5A&oh=00_AfY1GFY5reK_6ECarbrFx3Pv7OThFWRC_cwZMQvW21lfoA&oe=68C5AC2D)',
        }}>
        {/* Blur overlay */}
        <div className='absolute inset-0  bg-black/30 backdrop-blur-sm  z-10 ' />
        <div className=' relative flex flex-col md:flex-row justify-between items-center gap-6 bg-black bg-opacity-60 p-4   z-10'>
          <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left text-[#cef239]'>
            Semicolon Coder
          </h1>
          <div className='space-y-1 md:px-10 text-center md:text-left'>
            <p className='text-sm md:text-md font-semibold'>
              নিজের প্রতিষ্ঠানের কাস্টমাইজ ওয়েবসাইট/অ্যাপ বানাতে ভিসিট করুন।
            </p>
            <p>যোগাযোগ - ০১৫৮০৩০৭৮৯৪</p>
            <div className='flex justify-center md:justify-start space-x-4'>
              <button className='px-2 py-1 text-sm font-semibold rounded bg-violet-600 hover:bg-violet-700'>
                <a
                  target='_blank'
                  href='https://arsagor.netlify.app/'>
                  Website
                </a>
              </button>
              <button className='px-2 py-1 text-sm font-semibold rounded bg-green-600 hover:bg-green-700'>
                <a
                  href='https://wa.me/8801639136200'
                  target='_blank'
                  rel='noopener noreferrer'>
                  WhatsApp
                </a>
              </button>
              {/* social */}
              <div>
                <svg
                  width='0'
                  height='0'
                  style={{ position: 'absolute' }}>
                  <defs>
                    <clipPath
                      id='squircleClip'
                      clipPathUnits='objectBoundingBox'>
                      <path d='M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5'></path>
                    </clipPath>
                  </defs>
                </svg>

                <div className='relative flex items-end gap-x-2 p-2'>
                  {[
                    {
                      icon: (
                        <FaGithub className='text-white w-4 h-4 md:w-5 md:h-5' />
                      ), // reduced size for small screens
                      href: 'https://github.com/',
                      gradient: 'from-gray-700 to-gray-900',
                      border: 'border-gray-600/50',
                    },
                    {
                      icon: (
                        <FaLinkedin className='text-white w-4 h-4 md:w-5 md:h-5' />
                      ),
                      href: 'https://linkedin.com/',
                      gradient: 'from-blue-600 to-blue-800',
                      border: 'border-blue-500/50',
                    },
                    {
                      icon: (
                        <FaFacebook className='text-white w-4 h-4 md:w-5 md:h-5' />
                      ),
                      href: 'https://facebook.com/',
                      gradient: 'from-blue-500 to-blue-700',
                      border: 'border-blue-400/50',
                    },
                    {
                      icon: (
                        <FaYoutube className='text-white w-4 h-4 md:w-5 md:h-5' />
                      ),
                      href: 'https://youtube.com/',
                      gradient: 'from-red-600 to-red-800',
                      border: 'border-red-500/50',
                    },
                  ].map(({ icon, href, gradient, border }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'>
                      <div
                        style={{ clipPath: 'url(#squircleClip)' }}
                        className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg ${border} cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl`}>
                        {icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperAdds;
