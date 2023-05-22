/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import BodyContainer from '../BodyContainer/BodyContainer';
import classes from './TermsAndConditions.module.css';
import { hashLink } from '../../../utils/routes';
import { EXTERNAL_LINKS } from '../../../utils/constants';

const Wrapper = ({ showContainer, children }) => {
  return showContainer ? <BodyContainer>{children}</BodyContainer> : <>{children}</>;
};

const TermsAndPrivacy = ({ showContainer = true, isModalView = false }) => {
  return (
    <div>
      <Wrapper showContainer={showContainer}>
        <div className={`flex flex-col ${isModalView ? 'gap-2' : 'gap-4'}`}>
          <div className={classes.heading}>Last updated: May 30, 2023</div>
          <div className={`${classes.heading} mt-6`} id={hashLink.TermsAndConditions}>
            Terms And Conditions -{' '}
          </div>

          <div className={classes.root}>
            Welcome to Skiller Champion, the Company, referred to as "we," "us," or "our," is
            accessible through a website interface. It is important to carefully read this Agreement
            as it outlines the terms and conditions, privacy policy for accessing and using the
            Service offered by the Company. We kindly request that you review the Privacy Policy,
            which governs how the company collects, uses, and shares your information. By accessing
            and utilizing the Site and its associated domains, you consent to be bound by this
            Agreement, encompassing the Terms of Service (as described in Section A) and Privacy
            Policy (as described in Section B). The Service encompasses the Site itself, its use,
            and all the services provided by the Company. There is a significant risk of financial
            loss when interacting with cryptocurrency services due to which it is crucial to
            carefully assess whether engaging in crypto casino games is appropriate for you, given
            your financial situation.{' '}
            <span className={classes.bold}>
              WE ENCOURAGE YOU TO LIMIT YOUR GAMING / GAMBLING AMOUNT FOR YOUR OWN SAFETY. IF YOU
              NEED HELP WITH GAMBLING, PLEASE REACH US OUT AT todo:COMPANYEMAIL. WE, IN ANY WAY DO
              NOT PROVIDE FINANCIAL ADVICE AND REQUEST YOU TO CONDUCT PROPER RESEARCH BEFORE PLAYING
              CRYPTO GAMES.
            </span>{' '}
            Moreover, under this Agreement. It is necessary that communications to us should be only
            conducted at either (i) email at TODO:email, or (ii) Twitter - @SkillerChampion.
          </div>

          <div
            className={`${classes.heading} ${isModalView ? 'mt-4' : 'mt-8'}  ${
              classes.bold
            } text-center underline`}>
            Section A
          </div>
          <div className={`${classes.bold} ${classes.root}`}>
            BY ACCEPTING THIS AGREEMENT USING THE “I ACCEPT” BUTTON BELOW, IT IS IMPORTANT TO
            UNDERSTAND THAT YOU ARE AGREEING TO SETTLE ANY DISAGREEMENTS WITH THE COMPANY BY MEANS
            OF BINDING INDIVIDUAL ARBITRATION, RATHER THAN PURSUING LEGAL ACTION IN COURT.
            ADDITIONALLY, BY CLICKING "I ACCEPT" BELOW OR ACCESSING THE SERVICE, YOU CONFIRM THAT
            YOU HAVE CAREFULLY READ, COMPREHENDED, AND CONSENT TO BE LEGALLY OBLIGATED BY THE
            TOTALITY OF THIS AGREEMENT.
          </div>
          <div className={classes.root}>
            1 - Service:{' '}
            <span className={classes.bold}>
              WE MAKE NO GUARANTEES REGARDING UNINTERRUPTED AVAILABILITY OF THE SERVICE AND THE
              COMPANY HOLDS NO RESPONSIBILITY FOR ANY LOSSES INCURRED DUE TO GAME LOSSES,
              TRANSACTION CANCELLATIONS, DELAYS, APPLICATION UPDATES, SERVICE CRYPTO ACCOUNT BEING
              OUT OF FUNDS, SLOW PERFORMANCE, OR GLITCHES.
            </span>{' '}
            The Company leverages Hedera Hashgraph for providing NFT’s and crypto gaming services
            and uses fair possible outcomes and are not unethically manipulated by the Company in
            any way -
            <a
              className={`underline`}
              href={EXTERNAL_LINKS.GITHUB_OPEN_SOURCE_LINK}
              target="_blank"
              rel="noreferrer">
              {EXTERNAL_LINKS.GITHUB_OPEN_SOURCE_LINK}
            </a>{' '}
            . Furthermore, the Company assumes no liability for any harm caused by computer/account
            hacks, viruses, attacks or other malicious code that may impact your or our equipment
            and the Company disclaims any responsibility for damages arising from phishing,
            spoofing, or other types of attacks. NOTE THAT WE ONLY ALLOW YOU TO PLAY GAMES USING
            CRYPTOCURRENCIES AND WE DO NOT PROVIDE ANY ONRAMP/OFFRAMP, DEPOSITS AND WITHDRAWALS OF
            FIAT CURRENCIES. Moreover, with the use of the Service, you agree to pay a small
            percentage fee in HBAR crypto on some gaming transactions.
          </div>

          <div className={classes.root}>
            2 - Eligibility:{' '}
            <span className={classes.bold}>
              YOU AGREE THAT YOU ARE AT LEAST NINETEEN (19) YEARS OLD, POSSESS THE LEGAL CAPACITY TO
              ENTER INTO A BINDING AGREEMENT WITH THE COMPANY, AND YOU ACKNOWLEDGE THAT USING THE
              SERVICE WOULD NOT BE ILLEGAL OR VIOLATE ANY APPLICABLE LAWS IN YOUR JURISDICTION.
            </span>{' '}
            You guarantee that your access and use of the Service will fully comply with all
            relevant laws and regulations, and that you will not utilize the Service for any illegal
            activities. If you are accessing and utilizing the Service on behalf of a company or any
            other legal entity, you affirm that you have the authorization to legally bind that
            entity to this Agreement; any action performed by you with connection to your company or
            entity will encompass both yourself and the entity you are representing.{' '}
            <span className={classes.bold}>
              MOREOVER, YOU AGREE TO VERIFY THAT CRYPTOCURRENCY GAMBLING IS NOT PROHIBITED IN YOUR
              JURISDICTION, AND IF IT IS, YOU MUST IMMEDIATELY CEASE USING OUR SERVICE.
            </span>{' '}
            Furthermore, you acknowledge that using the Service would not be illegal or violate any
            applicable laws in your jurisdiction. You guarantee that your access and use of the
            Service will fully comply with all relevant laws and regulations. You agree to comply
            with our request to provide us with certain Personal Information (as defined in the
            Privacy Policy) and consent to us for maintaining a record of such Personal Information
            for business purposes.
          </div>

          <div className={classes.root}>
            3 - Indemnity and Liability Limitations: Under all circumstance, you agree to defend and
            protect our directors, employees, agents, affiliates, and subsidiaries of the Company
            from any and all claims, damages, obligations, losses, liabilities, costs, and expenses
            arising from your use and sharing of the Service, as well as your violation of any terms
            in this Agreement. In no event shall we, Service, Company or any Company Representatives
            be held liable to you for any claims, liabilities, obligations, damages or costs
            exceeding the maximum of either (i) - Total amount you paid to the Service for an
            individual gaming round, or (ii) - $0.00.
          </div>

          <div className={classes.root}>
            4 - Use of Content and Proprietary rights: The Service allows you to store and share
            public content, such as leader board rankings, game results, Hedera Consensus Service
            messages, images, music, audio, and videos. By sharing posts, you grant the Company a
            global, royalty-free, non-exclusive license and right to publicly display, sublicense,
            distribute, transfer, use, copy, edit, and generate inspired works from your posts for
            services. It is crucial to understand that you bear full responsibility for your posts,
            and the Company disclaims any responsibility for your actions, without claiming
            ownership rights over your shared posts. Additionally, you acknowledge that other users
            may share the outcome of your game, as the game results for all users are publicly
            accessible on Hedera Hashgraph -
            <a
              className={`underline`}
              href={EXTERNAL_LINKS.HASHSCAN_MAINNET}
              target="_blank"
              rel="noreferrer">
              {EXTERNAL_LINKS.HASHSCAN_MAINNET}
            </a>{' '}
            . These content policies are only bound to the publicly available content and do not
            allow you to share the Company’s intellectual properties including (but not limited to)
            sensitive data, text, music, software, functionalities, images, logo, trademarks,
            copyrights.
          </div>

          <div className={classes.root}>
            5 - Agreement modifications: We have the exclusive authority to periodically modify this
            Agreement, and we will inform you of such changes by updating the date at the beginning
            of the Agreement. ONCE POSTED, THE REVISIONS WILL BE EFFECTIVE, AND YOUR CONTINUED USE
            OF THE SERVICE WILL SIGNIFY YOUR ACCEPTANCE OF THOSE CHANGES. If you disagree with any
            modifications to this Agreement, you must promptly stop accessing and using the Service;
            ADDITIONALLY, WE HAVE THE SOLE DISCRETION TO MODIFY OR TERMINATE THE ENTIRE SERVICE OR
            ANY PORTION OF IT, WITHOUT ANY PRIOR NOTICE. You agree that upon termination, the
            entirety of the agreement will still be applicable to you. The latest version of the
            Agreement can be found at TODO: LINK.
          </div>

          <div className={classes.root}>
            6 - Third party resources: You acknowledge that you hold sole responsibility and assume
            all risks associated with your utilization of third-party resources, including database
            storage, application deployment, and the underlying hashgraph protocol. It is hereby
            understood and agreed that the Company will not be held liable for any losses or damages
            arising from errors or delays of third-party services or any attacks.
          </div>

          <div className={classes.root}>
            7 - Taxes and Promotions: You understand that we do not provide any tax related data to
            users and you bear complete responsibility for your own tax obligations and it is your
            responsibility to assess the extent to which taxes are applicable to any transactions
            you undertake through your use of the Service. You acknowledge that we have the right to
            run promotions or offers such as - Free NFT giveaways, as determined solely by us, to
            provide additional benefits to selected users of the Service. We retain the authority to
            revoke or terminate such offers or promotions at our sole discretion, without any prior
            notice.
          </div>

          <div
            className={`${classes.heading} ${isModalView ? 'mt-6' : 'mt-10'}  ${
              classes.bold
            } text-center underline`}>
            Section B
          </div>
          <div className={`${classes.heading} mt-2`} id={hashLink.privacyPolicy}>
            Privacy Policy-{' '}
          </div>

          <div className={classes.root}>
            The Privacy Policy provided here outlines the methods through which Skiller Champion,
            also known as "we," "us," or "our" in this document, gathers, utilizes, discloses, and
            safeguards the personal data belonging to individuals who visit its website: TODO:Main
            LINK. The personal data that we may gather from you, collectively referred to as
            "Personal Information” and the “Service” encompasses the Site itself, its use, and all
            the services provided by the Company. By accessing and utilizing the Site and its
            associated domains, you consent to be bound by this Agreement, encompassing the Terms of
            Service and Privacy Policy.
          </div>

          <div className={classes.root}>
            If you have any inquiries regarding this Privacy Policy, you can reach out to us at the
            following contact details: (i) email at TODO:email, or (ii) Twitter - @SkillerChampion.
          </div>

          <div className={`${classes.root} ${classes.bold}`}>
            BY CLICKING "I ACCEPT" BELOW OR ACCESSING THE SERVICE, YOU CONFIRM THAT YOU HAVE
            CAREFULLY READ, COMPREHENDED, AND CONSENT TO BE LEGALLY OBLIGATED BY THE ENTIRETY OF
            THIS AGREEMENT FOR TERMS OF SERVICE AND PRIVACY POLICY. IF YOU DO NOT AGREE WITH ANY
            PART OF THIS AGREEMENT, WE STRICTLY ADVISE YOU TO NOT USE THIS SERVICE.
          </div>

          <div className={`${classes.root}`}>
            <span className={classes.bold}>
              YOU AGREE THAT YOU ARE AT LEAST NINETEEN (19) YEARS OLD, POSSESS THE LEGAL CAPACITY TO
              ENTER INTO A BINDING AGREEMENT WITH THE COMPANY, AND YOU ACKNOWLEDGE THAT USING THE
              SERVICE WOULD NOT BE ILLEGAL OR VIOLATE ANY APPLICABLE LAWS IN YOUR JURISDICTION. IF
              THE COMPANY FINDS THAT YOU ARE UNDERAGE AND HAS BEEN USING THIS SERVICE, THE SERVICE
              SHALL DELETE YOUR DATA WITHIN 7 DAYS OF ACKNOWLEDGEMENT, GIVEN THAT YOUR WALLET
              ADDRESS IS KNOWN TO THE COMPANY.
            </span>{' '}
            The regulations outlined in this Privacy Policy only include the data collected by the
            Company via Service and do not encompass the data that you provide us through email,
            text, or other digital mediums; moreover, this policy also does not encompass the data
            collected by third-party websites or services that you may access through the
            utilization of the Service.
          </div>

          <div className={`${classes.root}`}>
            1 - The data we collect: Cookies, IP address, server details, browser details, Account
            addresses, usage information with the Service, game results details such as winning
            amount, token id, token type, winning account details, transaction details with us and
            Hashgraph protocol. Any information including (but not limited to) email, name, address,
            phone number, social media posts and so on that you provide to us during your
            communication with us via digital mediums such as email, surveys and so on.
          </div>

          <div className={`${classes.root} ${classes.bold}`}>
            IT IS CRUCIAL TO NOTE THE GAME RESULTS DETAILS INCLUDING (BUT NOT LIMITED TO) - YOUR
            ACCOUNT ID, WINNING/LOSING AMOUNT ARE ALSO POSTED ON HEDERA HASHGRAPH USING CONSENSUS
            SERVICE FOR IMMUTABLE DATA LOGGING AND ARE PUBLICLY ACCESSIBLE.
          </div>

          <div className={`${classes.root}`}>
            2 - How we utilize your Personal Information: To enhance our Service, we may utilize
            your Personal Information to provide you access, operate, maintain, and improve the
            quality of our Services. We use your Personal Information for facilitating games on the
            Service and for storing data in our database for improving our Service and promotions.
            We use your Personal Information for providing customer services in cases when you
            contact us for assistance We use your Personal Information for identity verification,
            fraud prevention, monitoring usage, targeted advertising and marketing. We use you
            Personal Information for monitoring and analyzing user activity on the Service using
            Third Party services such as - Google cloud,Google Analytics
          </div>

          <div className={`${classes.root}`}>
            3 - Personal Information sharing: You agree and acknowledge the following implication of
            sharing your Personal Information. You understand that we may share your Personal
            Information with legal authorities for compliance reasons or to mitigate the threats to
            national security. You understand that we may store or move your Personal Information in
            any part of the world (ex - Canada, France, Germany and so on.). You understand that we
            may transfer your Personal Information to other entities in the light of law for cases
            including (but not limited to) assets transfer, company sale, merging, bankruptcy,
            transfer of Service, transfer of technologies and so on. You understand the risks
            associated with sharing and utilizing your personal information for promotions,
            referrals with third parties and the Company in any way is not liable for the privacy
            practices of third party services.
          </div>

          <div className={`${classes.root}`}>
            4 - Agreement modifications: We have the exclusive authority to periodically modify this
            Privacy policy, and we will inform you of such changes by updating the date at the
            beginning of the Agreement.{' '}
            <span className={classes.bold}>
              ONCE POSTED, THE REVISIONS WILL BE EFFECTIVE, AND YOUR CONTINUED USE OF THE SERVICE
              WILL SIGNIFY YOUR ACCEPTANCE OF THOSE CHANGES. If you disagree with any modifications
              to this privacy policy, you must promptly stop accessing and using the Service;
              ADDITIONALLY, WE HAVE THE SOLE DISCRETION TO MODIFY OR TERMINATE THE ENTIRE SERVICE OR
              ANY PORTION OF IT, WITHOUT ANY PRIOR NOTICE.
            </span>{' '}
            You agree that upon termination, the entirety of the agreement will still be applicable
            to you.
          </div>

          <div className={`${classes.root}`}>
            5 - Security and Data retention: Although we practice industry standards for data
            security, you acknowledge that no system is completely attack prone and your Personal
            Information may be exposed in unforeseen circumstances.{' '}
            <span className={classes.bold}>
              WE ARE NOT LIABLE FOR DAMAGES or PROBLEMS ARISING FROM UNFORESEEN CIRCUMSTANCES, YOU
              ARE USING OUR SERVICE AT YOUR OWN RISK. MOREOVER, YOU ACKNOWLEDGE THAT THE COMPANY
              SHALL KEEP RECORDS OF YOUR PERSONAL INFORMATION FOR AS MUCH TIME AS REQUIRED FOR
              PROVIDING SERVICE UNDER THE LAW.
            </span>{' '}
          </div>

          <div className={`${classes.root} ${isModalView ? 'mb-12' : 'mb-44'}`}>
            6 - What are your privileges: You have the right to withdraw your consent, you can do so
            by contacting us using our official contact handles (as described in Section A). Please
            note that we may still gather and utilize non-personal information such as Games played,
            winnings, losses and so on. If required by law, we may still store some of your Personal
            Information for legal purposes.
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default TermsAndPrivacy;
