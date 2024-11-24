// Reusable Component for Section Headers
interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader = ({ children }: SectionHeaderProps) => (
  <h2 className="text-2xl font-semibold text-white mt-8 mb-4 sm:text-xl md:text-2xl lg:text-3xl">{children}</h2>
);

// Reusable Component for Paragraphs
interface SectionParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const SectionParagraph = ({ children, className = '' }: SectionParagraphProps ) => (
  <p className={`text-lg text-gray-500 mb-4 ${className} sm:text-base md:text-lg lg:text-xl`}>
    {children}
  </p>
);

// Reusable Component for List Items
interface ListItem {
  title: string;
  description: string;
}

interface SectionListProps {
  items: ListItem[];
}

const SectionList = ({ items }: SectionListProps) => (
  <ul className="list-disc pl-6 text-lg text-gray-300 mb-6 sm:text-base md:text-lg lg:text-xl">
    {items.map((item, index) => (
      <li key={index} className="mt-4">
        <strong className="text-white">{item.title}:</strong> {item.description}
      </li>
    ))}
  </ul>
);

const PrivacyPolicy: React.FC = () => {
  const informationWeCollect: ListItem[] = [
    {
      title: 'Personal Information',
      description: 'This includes data you provide when creating an account or using our services, such as your name, email, password, etc.',
    },
    {
      title: 'Usage Data',
      description: 'Automatically collected data about your usage of the app, such as interaction patterns and app features you engage with.',
    },
  ];

  const howWeUseInfo: string[] = [
    'To create and manage your account.',
    'To process payments securely and efficiently.',
    'To provide customer support and resolve issues.',
    'To analyze usage data to improve our services and features.',
  ];

  return (
    <div className="w-full px-6 py-8 sm:px-4 md:px-6 lg:px-12 xl:px-16">
      <h1 className="text-3xl text-white font-bold text-center mb-8 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
        Privacy Policy
      </h1>

      <SectionParagraph>
        At TapNGo, we prioritize your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains the types of information we collect, how we use it, and how we protect your data while using our services.
      </SectionParagraph>

      <SectionHeader>Information We Collect</SectionHeader>
      <SectionParagraph>
        We collect several types of information to improve your experience with TapNGo:
      </SectionParagraph>
      <SectionList items={informationWeCollect} />

      <SectionHeader>How We Use Your Information</SectionHeader>
      <SectionParagraph>
        The information we collect helps us deliver and enhance your experience with TapNGo. We use it for the following purposes:
      </SectionParagraph>
      <SectionList items={howWeUseInfo.map((item) => ({ title: '', description: item }))} />

      <SectionHeader>Cookies</SectionHeader>
      <SectionParagraph>
        We use cookies to enhance your experience on TapNGo. Cookies allow us to remember your preferences, authenticate your sessions, and provide you with a personalized experience.
      </SectionParagraph>

      <SectionHeader>Data Protection</SectionHeader>
      <SectionParagraph>
        TapNGo employs industry-standard security measures to safeguard your information from unauthorized access or breaches. However, no method of online communication or data storage is entirely secure, and we cannot guarantee 100% security.
      </SectionParagraph>

      <SectionHeader>Your Rights</SectionHeader>
      <SectionParagraph>
        You have the right to access, correct, or delete your personal information stored with us. If you would like to exercise these rights or have any concerns regarding your data, please contact us.
      </SectionParagraph>

      <SectionHeader>Changes to the Privacy Policy</SectionHeader>
      <SectionParagraph>
        We may update this Privacy Policy from time to time. Any major changes will be communicated through a notice on the app or website to ensure you're always informed about how your information is being handled.
      </SectionParagraph>

      <SectionHeader>Contact Us</SectionHeader>
      <SectionParagraph>
        If you have any questions or concerns regarding this Privacy Policy, please feel free to reach out to us at{' '}
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tapngo70@gmail.com" className="text-blue-500">
          tapngo70@gmail.com
        </a>.
      </SectionParagraph>
    </div>
  );
};

export default PrivacyPolicy;
