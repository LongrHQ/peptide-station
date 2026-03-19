import Sticky from 'react-stickynode';
import { Element, Link } from 'react-scroll';
import { useMedia } from 'helpers/use-media';

interface PolicySection {
  id: string;
  title: string;
  description: string;
}

interface PolicyData {
  title: string;
  date: string;
  content: PolicySection[];
}

interface Props {
  data: PolicyData;
}

const PolicyPageContent = ({ data }: Props) => {
  const { title, date, content } = data;
  const mobile = useMedia('(max-width: 767px)');
  const menuItems = content.map((item) => item.title);

  return (
    <div className="w-full m-auto px-4 lg:px-35px pt-40px pb-100px">
      <div className="w-full flex flex-col mb-60px">
        <h3
          className="font-display font-normal mb-20px"
          style={{ fontSize: '36px', color: 'var(--ps-ink)', letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--ps-muted)' }}>
          Last updated: {date}
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sticky sidebar nav */}
        <div className="w-full md:w-1/3 lg:w-1/4 md:20px" style={{ flex: '0 0 auto' }}>
          <Sticky top={mobile ? 88 : 110} innerZ="1">
            <div className="w-full pr-4 py-2 md:py-0" style={{ backgroundColor: 'var(--ps-canvas)' }}>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={-130}
                  duration={400}
                  className="text-14px no-underline my-10px block capitalize cursor-pointer font-medium transition-colors duration-150 hover:text-gray-900"
                  activeClass="text-brand font-semibold"
                  style={{ color: 'var(--ps-muted)' }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </Sticky>
        </div>

        {/* Content */}
        <div className="w-full">
          {content.map((item) => (
            <Element name={item.title} style={{ paddingBottom: 48 }} key={item.id}>
              <h3
                className="font-display font-normal mb-20px"
                style={{ fontSize: '24px', color: 'var(--ps-ink)' }}
              >
                {item.title}
              </h3>
              <div
                className="html-content prose"
                style={{ color: 'var(--ps-text)', lineHeight: 1.75, fontSize: '15px' }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </Element>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyPageContent;
