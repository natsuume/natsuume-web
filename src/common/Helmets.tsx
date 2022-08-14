import { Helmet } from "react-helmet-async";

export const CommonHeader = () => {
  return (
    <>
      <HelmetTemplate
        title="default title"
        description="default description"
      ></HelmetTemplate>
    </>
  );
};

export type HelmetParams = {
  title: string;
  description: string;
  ogpImage?: string;
  ogpPath?: string;
};

export const HelmetTemplate = ({ title, description }: HelmetParams) => {
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description}></meta>
  </Helmet>
};
