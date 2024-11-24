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

const TermsOfService: React.FC = () => {
  const termsList: ListItem[] = [
    {
      title: 'Account Creation',
      description: 'To use tapNgo, you must create an account. You are responsible for maintaining the security of your account.',
    },
    {
      title: 'App Usage',
      description: 'You agree to use our app in accordance with all applicable laws and regulations. You may not use our app for any unlawful or prohibited purpose.',
    },
    {
      title: 'Payment Processing',
      description: 'No real money is involved in this app. This app is purely based on dummy amount.',
    },
    {
      title: 'Intellectual Property',
      description: 'tapNgo and its logo are trademarks of mallik.tech. All other trademarks used in our app are the property of their respective owners.',
    },
    {
      title: 'Disclaimer',
      description: 'tapNgo does not guarantee the accuracy or completeness of the information provided through our app. We are not responsible for any damages or losses arising from your use of our app.',
    },
    {
      title: 'Limitation of Liability',
      description: 'Our liability to you for any claim or damages arising from your use of our app is limited to the amount you paid for our services. Currently, we have no paid services.',
    },
    {
      title: 'Governing Law',
      description: 'These Terms of Service shall be governed by and construed in accordance with the laws of Jurisdiction.',
    },
  ];

  return (
    <div className="w-full px-6 py-8 sm:px-4 md:px-6 lg:px-12 xl:px-16">
      <h1 className="text-3xl text-white font-bold text-center mb-8 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
        Terms of Service
      </h1>

      <SectionParagraph>
        These Terms of Service govern your use of the tapNgo app. By using our app, you agree to these terms.
      </SectionParagraph>

      <SectionHeader>Account Creation</SectionHeader>
      <SectionParagraph>
        To use tapNgo, you must create an account. You are responsible for maintaining the security of your account.
      </SectionParagraph>

      <SectionHeader>App Usage</SectionHeader>
      <SectionParagraph>
        You agree to use our app in accordance with all applicable laws and regulations. You may not use our app for any unlawful or prohibited purpose.
      </SectionParagraph>

      <SectionHeader>Payment Processing</SectionHeader>
      <SectionParagraph>
        No real money is involved in this app. This app is purely based on dummy amount.
      </SectionParagraph>

      <SectionHeader>Intellectual Property</SectionHeader>
      <SectionParagraph>
        tapNgo and its logo are trademarks of mallik.tech. All other trademarks used in our app are the property of their respective owners.
      </SectionParagraph>

      <SectionHeader>Disclaimer</SectionHeader>
      <SectionParagraph>
        tapNgo does not guarantee the accuracy or completeness of the information provided through our app. We are not responsible for any damages or losses arising from your use of our app.
      </SectionParagraph>

      <SectionHeader>Limitation of Liability</SectionHeader>
      <SectionParagraph>
        Our liability to you for any claim or damages arising from your use of our app is limited to the amount you paid for our services. Currently, we have no paid services.
      </SectionParagraph>

      <SectionHeader>Governing Law</SectionHeader>
      <SectionParagraph>
        These Terms of Service shall be governed by and construed in accordance with the laws of Jurisdiction.
      </SectionParagraph>

      <SectionHeader>Contact Information</SectionHeader>
      <SectionParagraph>
        If you have any questions about these Terms of Service, please contact us at{' '}
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tapngo70@gmail.com" className="text-blue-500">
          tapngo70@gmail.com
        </a>.
      </SectionParagraph>
    </div>
  );
};

export default TermsOfService;
