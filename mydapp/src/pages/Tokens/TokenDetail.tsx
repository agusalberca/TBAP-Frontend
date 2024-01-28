import { Box, Container, HStack, Stack, Center, Card, 
  CardBody, Heading, Image, Text, Divider, VStack, Link  } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { withBackendProtection } from '../../features/auth/hocs/withBackendProtection';
import polygonScanLogo from '../../assets/images/polygonScanLogo.svg';
import { CommonHeader } from '../../features/ui/components/CommonHeader';
import {  FacebookIcon, FacebookShareButton, 
          TwitterIcon, TwitterShareButton, 
          LinkedinIcon ,LinkedinShareButton, 
          TelegramIcon ,TelegramShareButton, 
          WhatsappIcon ,WhatsappShareButton} from 'react-share';
 
import { useQuery } from 'react-query';
import { getTokenDetail } from '../../api/tokens';
import useAppContext from '../../hooks/useAppContext';
import { requireAuth } from '../auth/AboutYou';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
const { REACT_APP_NFT_CONTRACT_ADDRESS } = process.env;


export const TokenDetailPage: React.FC = withBackendProtection(() => {
    requireAuth()
    const { t } = useTranslation('TokenDetailPage');
    const {  token, tokenDetailId  } = useAppContext()
    let tokenDetail = null
    const { data, isLoading } = useQuery('getTokenDetail', () =>
      getTokenDetail(token, tokenDetailId)
      );
    tokenDetail = data
    return (
    <Box>
      <Container maxW="7xl" py={2} as={Stack} spacing={2}>
        <CommonHeader 
            title='Token Detail'
            description='This token belongs to you!'
        />
        {!isLoading && (
        <Center>
        <Box>
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
          >
            <VStack>
              <HStack>
                <Image
                  objectFit='cover'
                  maxW={{ base: '100%', sm: '200px' }}
                  src={ tokenDetail.db_token?.image }
                  alt='Token image'
                />
                <Stack>
                  <CardBody>
                    <Center><Heading size='md'>{tokenDetail.blockchain_token.title}</Heading></Center>
                    <Text py='3'>{tokenDetail.db_token.description}</Text>
                    <Text py='2'>{t('Token ID')}:
                        <Link 
                        href={`https://mumbai.polygonscan.com/token/${REACT_APP_NFT_CONTRACT_ADDRESS}?a=${tokenDetail.blockchain_token.tokenId}`} 
                        isExternal>
                        {tokenDetail.blockchain_token.tokenId} <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" /> 
                      </Link>
                    </Text>
                    <Text py='2'>
                      {t('Created at')}: {tokenDetail.blockchain_token.createdAt}</Text>
                    <Text py='2'>
                    {t('URI')}:<Link href={tokenDetail.blockchain_token.uri} isExternal>
                          {tokenDetail.blockchain_token.uri} <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                          </Link>
                    </Text>
                  </CardBody>
                </Stack>
              </HStack>
              <Divider margin='0'/>
              <HStack>
                <Image objectFit='cover'maxW={{ base: '100%', sm: '100px' }}
                  src={ tokenDetail.organization.logo} alt='Token image'
                  />
                <CardBody>
                  <VStack>
                    <Heading size='sm'>{tokenDetail.organization.name}</Heading>
                    <Text py='2'>{tokenDetail.organization.description}</Text>
                  </VStack>
                </CardBody>
              </HStack>
              <Divider margin='0'/>
              <HStack>
                <CardBody>
                  <HStack> 
                    <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '120px' }}
                    src={polygonScanLogo}
                    alt='Token image'
                    />
                    <CardBody>
                      <Link 
                        href={`https://mumbai.polygonscan.com/address/${REACT_APP_NFT_CONTRACT_ADDRESS}?a=${tokenDetail.blockchain_token.tokenId}`} 
                        isExternal>
                        {t('Verify Contract')} <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" /> 
                      </Link>
                    </CardBody>
                  </HStack>
                </CardBody>
              </HStack>
              <Divider margin='0'/>
              <HStack>
                <CardBody>
                  <HStack> 
                    <FacebookShareButton 
                      url={`https://mumbai.polygonscan.com/address/${REACT_APP_NFT_CONTRACT_ADDRESS}`} 
                      quote={tokenDetail.blockchain_token.title}>
                      <FacebookIcon size='2rem' round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton 
                      url={`https://mumbai.polygonscan.com/address/${REACT_APP_NFT_CONTRACT_ADDRESS}`} title={tokenDetail.blockchain_token.title}>
                      <TwitterIcon size='2rem' round={true} />
                    </TwitterShareButton>
                    <LinkedinShareButton url={`https://mumbai.polygonscan.com/address/${REACT_APP_NFT_CONTRACT_ADDRESS}`}>
                      <LinkedinIcon size='2rem' round={true} />
                    </LinkedinShareButton>
                    <TelegramShareButton url={`https://mumbai.polygonscan.com/address/${REACT_APP_NFT_CONTRACT_ADDRESS}`}>
                      <TelegramIcon size='2rem' round={true} />
                    </TelegramShareButton>
                    <WhatsappShareButton url={`https://mumbai.polygonscan.com/address/${REACT_APP_NFT_CONTRACT_ADDRESS}`}>
                      <WhatsappIcon size='2rem' round={true} />
                    </WhatsappShareButton>
                  </HStack>
                </CardBody>
              </HStack>
            </VStack>
          </Card>
        </Box>
        </Center>
        )}
      </Container>
    </Box>
    );
});
