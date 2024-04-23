"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import PageSection from "@/components/PageSection";
import Slider from "@/components/Slider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import CloseIcon from "@mui/icons-material/Close";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Tab,
  Tabs,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SplideSlide } from "react-splide-ts";
import "react-splide-ts/css";
import { Controller, useForm } from "react-hook-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendContactForm } from "@/serverActions";
import MenuIcon from "@mui/icons-material/Menu";
import { TransitionProps } from "@mui/material/transitions";
import TestimonyAvatar from "@/components/TestimonyAvatar";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const contactSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    phone: z
      .string()
      .regex(
        /^\((1[1-9]|2[12478]|3[123578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])\)\s9[0-9]{4}-[0-9]{4}$/,
        { message: "Celular inválido" }
      ),
    message: z.string().min(1, { message: "Mensagem é obrigatória" }),
    token: z.string(),
  })
  .required();

export type ContactValues = z.infer<typeof contactSchema>;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function Home() {
  const [tab, setTab] = useState(0);
  const [token, setToken] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const xs = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const t = await executeRecaptcha();
    setToken(t);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const NumericFormatCustom = React.forwardRef<PatternFormatProps>(
    function NumericFormatCustom(props, ref) {
      return (
        <PatternFormat {...props} getInputRef={ref} format="(##) #####-####" />
      );
    }
  );
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const influencers = [
    {
      name: "BRKsEDU",
      description:
        "Com mais de 13 anos na internet, Edu tem um canal com quase 10mi de inscritos no YouTube.",
      image: "/images/influes/brksedu.jpg",
    },
    {
      name: "Adrenaline",
      description:
        "Um dos maiores canais de hardware do Brasil, com mais de 1mi de inscritos no YouTube.",
      image: "/images/influes/adrenaline.jpg",
    },
    {
      name: "Escolha Segura",
      description:
        "Especializado em reviews de produtos de tecnologia com mais de 2,3mi de seguidores em suas redes.",
      image: "/images/influes/escolhasegura.jpg",
    },
    {
      name: "Be!Tech",
      description:
        "Com mais de 1,6mi no Youtube, Felipe Becker fala sobre tecnologia de forma simples e descomplicada.",
      image: "/images/influes/betech.jpg",
    },
    {
      name: "Dudu Rocha",
      description:
        "Dudu Rocha, especialista em tecnologia, analista de produtos, ensina a usar a tecnologia ao seu favor, desde 2013 no YouTube.",
      image: "/images/influes/dudurocha.jpg",
    },
    {
      name: "Fiaspo",
      description:
        "Aficionado por jogos! Fiaspo é um dos maiores influenciadores de jogos eletrônicos do Brasil.",
      image: "/images/influes/fiaspo.jpg",
    },
    {
      name: "Mundo Conectado",
      description:
        "Fonte de informação sobre Tecnologia e Entretenimento, com notícias e análises de eletrônicos como smartphones, TVs, drones e mais.",
      image: "/images/influes/mundoconectado.jpg",
    },
    {
      name: "Olhar Digital",
      description:
        "Um dos portais mais famosos do Brasil, focado em novidades da tecnologia.",
      image: "/images/influes/olhardigital.jpg",
    },
    {
      name: "Proteste",
      description:
        "Associação Brasileira de Defesa do Consumidor, promovendo a valorização e defesa dos direitos de compra dos cidadãos.",
      image: "/images/influes/proteste.jpg",
    },
  ].filter((_, index) => index < 8);
  const testmonies = [
    {
      name: "Escolha Segura",
      description:
        "As ferramentas da Influsolutions trouxeram uma rentabilidade recorrente que não só me deu estabilidade como me permitiu focar na criação de conteúdo e no crescimento da minha equipe. Elas são parte essencial da nossa história e da nossa estratégia!.",
      image: "/images/influes/escolhasegura.jpg",
    },
    {
      name: "Fiaspo",
      description:
        "Sou parceiro da Influe Solutions desde 2020. Nossa ferramenta de comparador de preços já ajudou mais de 20.000 pessoas a economizarem na hora de comprar pela internet e aproveitar de fato as melhores promoções. Suporte excelente na manutenção da ferramenta, transparência nos relatórios e agilidade na comunicação! Hoje nosso comparador é uma parte importante do nosso negócio.",
      image: "/images/influes/fiaspo.jpg",
    },
    {
      name: "Be!Tech",
      description:
        "Patrick tem sido um parceiro inestimável ao longo dos últimos anos. Com um olhar sempre voltado para a inovação e aprimoramento, ele tem nos permitido entregar continuamente o melhor para o nosso público. As soluções que ele desenvolveu não só possibilitaram que eu disponibilizasse uma ferramenta excepcional para meus seguidores, mas também contribuíram para uma renda mensal significativa.",
      image: "/images/influes/betech.jpg",
    },
  ].filter((_, index) => index < 8);

  const defaultValues: ContactValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    token: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactValues>({
    mode: "onBlur",
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactValues) => {
    setMessage("");
    setDisabled(true);
    data.token = token;
    const result = await sendContactForm(data);
    handleReCaptchaVerify();
    reset(defaultValues);
    setDisabled(false);
    if (result.status) {
      setMessage("Mensagem enviada com sucesso!");
      return;
    }
    setMessage(result.error ?? "Erro ao enviar a mensagem");
  };

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              component={"img"}
              src="/images/logo.svg"
              height={{ xs: "43px", md: "65px" }}
            />
            <Box display={{ xs: "flex", md: "none" }}>
              <IconButton onClick={openMenu}>
                <MenuIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
            <Box
              display={{ xs: "none", md: "flex" }}
              gap={5}
              alignItems={"center"}
            >
              <Button component="a" href="#sobrenos" variant="text">
                <Typography variant="menu">Sobre Nós</Typography>
              </Button>
              <Button component="a" href="#influenciadores" variant="text">
                <Typography variant="menu">Influenciadores</Typography>
              </Button>
              <Button component="a" href="#ferramentas" variant="text">
                <Typography variant="menu">Ferramentas</Typography>
              </Button>
              <Button component="a" href="#depoimentos" variant="text">
                <Typography variant="menu">Depoimentos</Typography>
              </Button>
              <Button component="a" href="#faq" variant="text">
                <Typography variant="menu">FAQ</Typography>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="#contato"
              >
                Contato
              </Button>
            </Box>
          </Box>
          <ParallaxProvider>
            <Box mt={10}>
              <Grid container spacing={{ xs: 8, md: 16.5 }}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Parallax opacity={[2, 0]}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap={"40px"}
                      textAlign={{ xs: "center", md: "start" }}
                    >
                      <Typography
                        variant="h1"
                        fontSize={{ xs: "3rem", sm: "3.875rem" }}
                      >
                        Soluções para monetizar seu negócio.
                      </Typography>
                      <Typography
                        variant="sub"
                        fontSize={{ xs: "1.5rem", sm: "1.75rem" }}
                      >
                        Aumente o faturamento do seu canal do Youtube ou Site
                        sem perder o foco do seu negócio.
                      </Typography>
                      {/* <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ width: "250px", height: "70px" }}
                    >
                      Saiba mais
                    </Button>
                  </Box> */}
                    </Box>
                  </Parallax>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Parallax opacity={[3.5, 0]} translateY={[15, -1]}>
                    <Box
                      component={"img"}
                      src="/images/computer_smartphone.png"
                      width={"100%"}
                    />
                  </Parallax>
                </Grid>
              </Grid>
            </Box>
          </ParallaxProvider>
        </Container>
      </Box>

      <ParallaxProvider>
        <PageSection title="Sobre Nós" id="sobrenos">
          <Grid container spacing={{ xs: 8, md: 16.5 }}>
            <Grid item xs={12} md={6}>
              <Parallax opacity={[0, 2]} translateY={[-10, 1]}>
                <Box
                  component={"img"}
                  src="/images/about_us.png"
                  width={"100%"}
                />
              </Parallax>
            </Grid>
            <Grid item xs={12} md={6}>
              <Parallax opacity={[0, 2]} translateY={[10, -1]}>
                <Typography variant="body2">
                  Com uma trajetória de mais de uma década no mercado de
                  afiliados, estamos empenhados em fornecer ferramentas
                  necessárias para que os influenciadores maximizem suas
                  receitas.
                </Typography>
                <Typography variant="body2" mt={2}>
                  Nosso sistema de Whitelabel permite personalizar e adaptar
                  nossas soluções para atender às necessidades específicas de
                  cada parceiro.
                </Typography>
                <Typography variant="h3" mt={7}>
                  Nossos números
                </Typography>
                <Grid container mt={3} rowSpacing={1}>
                  <Grid item xs={6} md={3}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      p={1}
                      textAlign={"center"}
                      height={"100%"}
                    >
                      <Typography variant="numbers">+R$130M</Typography>
                      <Typography variant="numbers2" textAlign={"center"}>
                        vendas todos anos
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      p={1}
                      borderLeft={1}
                      borderColor={"grey.400"}
                      textAlign={"center"}
                      height={"100%"}
                    >
                      <Typography variant="numbers">+R$20M</Typography>
                      <Typography variant="numbers2" textAlign={"center"}>
                        produtos cadastrados
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      p={1}
                      borderLeft={{ xs: 0, md: 1 }}
                      borderColor={{ xs: "grey.400", md: "grey.400" }}
                      textAlign={"center"}
                      height={"100%"}
                    >
                      <Typography variant="numbers">+500K</Typography>
                      <Typography variant="numbers2" textAlign={"center"}>
                        usuários economizando
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      p={1}
                      borderLeft={1}
                      borderColor={"grey.400"}
                      textAlign={"center"}
                      height={"100%"}
                    >
                      <Typography variant="numbers">+200</Typography>
                      <Typography variant="numbers2" textAlign={"center"}>
                        lojas parceiras
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Parallax>
            </Grid>
          </Grid>
        </PageSection>
      </ParallaxProvider>

      <PageSection
        title="Parceiros & Influenciadores"
        bgcolor="rgba(251, 232, 215, 0.3)"
        id="influenciadores"
      >
        <Box width={"100%"}>
          <Slider
            aria-label="Parceiros"
            options={{
              perPage: sm ? 1 : 3,
              perMove: 1,
              autoHeight: true,
              arrows: !xs,
            }}
          >
            {influencers.map((influencer) => (
              <SplideSlide key={influencer.name}>
                <ParallaxProvider>
                  <Parallax opacity={[0, 3]} translateY={[15, -1]}>
                    <Box
                      width={"350px"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <Box
                        component="img"
                        borderRadius={"50%"}
                        src={influencer.image}
                        alt="Image 1"
                        width={"255px"}
                        height={"255px"}
                      />
                      <Typography variant="influeName">
                        {influencer.name}
                      </Typography>
                      <Typography variant="body2" textAlign={"center"}>
                        {influencer.description}
                      </Typography>
                    </Box>
                  </Parallax>
                </ParallaxProvider>
              </SplideSlide>
            ))}
          </Slider>
        </Box>
      </PageSection>
      <PageSection title="Ferramentas" id="ferramentas">
        <Grid container spacing={{ xs: 8, md: 16.5 }}>
          <Grid item xs={12} md={6}>
            <ParallaxProvider>
              <Parallax opacity={[0, 3]} translateY={[-5, 1]}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="Tabs Ferramentas"
                  sx={{
                    mb: 3.785,
                    borderBottom: 1,
                    borderColor: "#507294",
                    ".MuiTab-root": {
                      fontSize: { xs: "1.5rem", sm: "2.5rem" },
                      textTransform: "none",
                      color: "#507294",
                    },
                    ".Mui-selected": {
                      color: "#008BCA",
                    },
                    ".MuiTabs-indicator": {
                      height: "5px",
                    },
                  }}
                >
                  <Tab label="Comparador" />
                  <Tab label="Extensão" />
                </Tabs>
                {tab === 0 && (
                  <Box>
                    <Typography variant="body2">
                      Nosso comparador de especificações abrange diversos
                      produtos. Com ele, você pode facilmente contrastar
                      características técnicas e funcionalidades, facilitando a
                      escolha do dispositivo ideal.
                    </Typography>
                    <List>
                      <ListItem
                        sx={{
                          px: 0,
                          alignItems: "start",
                        }}
                      >
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={700}>
                            Compare especificações
                          </Typography>
                          <Typography variant="body2">
                            São mais de 1000 produtos para comparar as
                            especificações entre eles, facilitando a escolha do
                            produto desejado.
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          px: 0,
                          alignItems: "start",
                        }}
                      >
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={700}>
                            Saiba onde comprar
                          </Typography>
                          <Typography variant="body2">
                            Veja as lojas e preços em um só lugar, fácil de
                            acessar e concluir a compra.
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          px: 0,
                          alignItems: "start",
                        }}
                      >
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={700}>
                            Do seu jeito!
                          </Typography>
                          <Typography variant="body2">
                            Layout personalizado para a cara da sua empresa ou
                            negócio.
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                )}
                {tab === 1 && (
                  <Box>
                    <Typography variant="body2">
                      Nossa ferramenta se destaca por proporcionar benefícios
                      tanto para os usuários quanto para as lojas. Com recursos
                      cuidadosamente projetados, aprimoramos a experiência do
                      usuário.
                    </Typography>
                    <List>
                      <ListItem
                        sx={{
                          px: 0,
                          alignItems: "start",
                        }}
                      >
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={700}>
                            Comparação de Produtos
                          </Typography>
                          <Typography variant="body2">
                            O recurso de comparação de preço auxilia aos
                            usuários a verificar onde é melhor comprar o produto
                            no momento.
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          px: 0,
                          alignItems: "start",
                        }}
                      >
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={700}>
                            Histórico do Preços
                          </Typography>
                          <Typography variant="body2">
                            Tenha o histórico de preços dos produtos das lojas
                            online e utilize para realizar uma compra
                            inteligente.
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        sx={{
                          px: 0,
                          alignItems: "start",
                        }}
                      >
                        <ListItemIcon>
                          <CheckIcon color="warning" fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography variant="body2" fontWeight={700}>
                            Cupons de Desconto
                          </Typography>
                          <Typography variant="body2">
                            Além de uma gama de cupons, há também o testador de
                            cupons automático, funcionando em mais de 300 lojas
                            online.
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Box>
                )}
              </Parallax>
            </ParallaxProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <ParallaxProvider>
              <Parallax opacity={[0, 3]} translateY={[10, -1]}>
                <Box
                  component={"img"}
                  src={`/images/monitor/monitor${tab === 0 ? "1" : "2"}.jpg`}
                  width={{ xs: "100%", md: "929px" }}
                />
              </Parallax>
            </ParallaxProvider>
          </Grid>
        </Grid>
      </PageSection>
      <PageSection
        title="Depoimentos"
        bgcolor="rgba(251, 232, 215, 0.3)"
        id="depoimentos"
      >
        <ParallaxProvider>
          <Parallax opacity={[0, 3]} translateY={[15, -3]}>
            <Slider
              aria-label="Depoimentos"
              options={{
                perPage: sm ? 1 : 2,
                perMove: 1,
                autoHeight: true,
                arrows: !xs,
              }}
            >
              {testmonies.map((testmony) => (
                <SplideSlide key={testmony.name}>
                  <Box
                    width={"500px"}
                    position={"relative"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <TestimonyAvatar
                      image={testmony.image}
                      alt={testmony.name}
                    />
                    <Box pl={{ xs: 0, sm: 16 }} pt={2}>
                      <Typography variant="body2" fontWeight={700}>
                        {testmony.name}
                      </Typography>
                      <Typography variant="testmony">
                        {'"'}
                        {testmony.description}
                        {'"'}
                      </Typography>
                    </Box>
                  </Box>
                </SplideSlide>
              ))}
            </Slider>
          </Parallax>
        </ParallaxProvider>
      </PageSection>
      <PageSection title="FAQ" id="faq">
        <Grid container spacing={16.5}>
          <ParallaxProvider>
            <Grid item xs={12} md={6}>
              <Parallax opacity={[0, 3]} translateY={[-10, 1]}>
                <Accordion square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                  >
                    Existe um número mínimo de seguidores que devo ter?
                  </AccordionSummary>
                  <AccordionDetails>
                    Consideramos um mínimo de 50 mil seguidores em suas redes
                    sociais para iniciar uma parceria. Porém, entenda que esse
                    não é o único critério que levamos em consideração. Você
                    deve ter um público engajado, que se identifique com o seu
                    conteúdo e ter um histórico de postagens frequentes e
                    relevantes.
                  </AccordionDetails>
                </Accordion>
                <Accordion square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                  >
                    Pode me explicar o conceito de Whitelabel?
                  </AccordionSummary>
                  <AccordionDetails>
                    Whitelabel é uma versão personalizada das nossas
                    ferramentas, adaptada com as características da sua marca ou
                    negócio. Nós fornecemos a tecnologia, enquanto você fica
                    responsável pela distribuição para o seu público-alvo.
                  </AccordionDetails>
                </Accordion>
                <Accordion square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    Qual é o processo para ingressar em uma parceria?
                  </AccordionSummary>
                  <AccordionDetails>
                    Para iniciar uma parceria, por favor, entre em contato
                    conosco através do{" "}
                    <Button
                      variant="text"
                      href="#contato"
                      sx={{ fontSize: "1rem", verticalAlign: "unset" }}
                    >
                      formulário
                    </Button>{" "}
                    disponível no nosso site. Ao fazê-lo, forneça informações
                    sobre o seu nicho, o número de seguidores que possui e as
                    suas estatísticas relevantes. Juntos, iremos analisar o
                    potencial de sinergia da parceria.
                  </AccordionDetails>
                </Accordion>
                <Accordion square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Há algum custo associado à criação de uma Whitelabel?
                  </AccordionSummary>
                  <AccordionDetails>
                    No momento, não cobramos nenhuma taxa para a criação do seu
                    Whitelabel, o custo é zero. No entanto, é importante
                    observar que podem haver taxas obrigatórias para o uso de
                    determinados serviços do Google, bem como possíveis
                    necessidades de aquisição de serviços de e-mail para
                    formulários de contato das ferramentas.
                  </AccordionDetails>
                </Accordion>
                <Accordion square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Como que ganho dinheiro com seus produtos?
                  </AccordionSummary>
                  <AccordionDetails>
                    Nossas ferramentas são projetadas para ajudar você a
                    monetizar seu site ou rede social. Você irá receber uma
                    parte de todas as vendas realizadas através das ferramentas
                    que você dilvulga.
                  </AccordionDetails>
                </Accordion>
                <Accordion square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    Qual é o procedimento para receber os valores?
                  </AccordionSummary>
                  <AccordionDetails>
                    Todos os valores serão pagos diretamente a você pelo
                    programa de afiliados e/ou lojas parceiras. O pagamento é
                    feito de acordo com as regras e prazos estabelecidos por
                    cada um dos programas de afiliados e/ou lojas parceiras.
                  </AccordionDetails>
                </Accordion>
              </Parallax>
            </Grid>
            <Grid item xs={12} md={6} display={{ xs: "none", md: "inherit" }}>
              <Parallax opacity={[0, 3]} translateY={[10, -1]}>
                <Box component={"img"} src="/images/faq.jpg" height={"650px"} />
              </Parallax>
            </Grid>
          </ParallaxProvider>
        </Grid>
      </PageSection>
      <PageSection
        title="Contato"
        bgcolor="rgba(251, 232, 215, 0.3)"
        subtitle="Quer aumentar seu faturamento sem perder o foco do seu negócio? Nos envie uma mensagem."
        id="contato"
      >
        <ParallaxProvider>
          <Parallax opacity={[0, 3]} translateY={[15, -1]}>
            <form>
              <Grid container spacing={2}>
                <Grid item container xs={12} md={6} spacing={1.55}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Nome"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutlineIcon />
                              </InputAdornment>
                            ),
                          }}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="E-mail"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailOutlineIcon />
                              </InputAdornment>
                            ),
                          }}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          placeholder="Celular"
                          fullWidth
                          InputProps={{
                            inputComponent: NumericFormatCustom as any,
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIphoneIcon />
                              </InputAdornment>
                            ),
                          }}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        placeholder="Mensagem"
                        rows={7}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EditNoteOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        sx={{
                          "& .MuiInputBase-root": {
                            alignItems: "start",
                            "& .MuiInputAdornment-root": {
                              height: "100%",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit(onSubmit)}
                    disabled={disabled}
                  >
                    Enviar Mensagem
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    color={message.includes("Erro") ? "red" : "#008BCA"}
                  >
                    {message}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Parallax>
        </ParallaxProvider>
      </PageSection>
      <PageSection bgcolor="#3D5A6C">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box component={"img"} src="/images/logo_2.svg" height={"65px"} />
            <Typography variant="body2" color="#C9DFF6" mt={5}>
              Soluções para aumentar a rentabilidade do seu site ou rede social.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display={{ xs: "none", md: "inherit" }}>
            <Grid container spacing={1} display={"flex"} alignItems={"start"}>
              <Grid item xl={12} mb={3}>
                <Typography variant="body2" color="#C9DFF6">
                  Navegue
                </Typography>
              </Grid>
              <Grid item xl={6}>
                <Button component="a" href="#sobrenos" variant="text">
                  <Typography variant="footer">Sobre nós</Typography>
                </Button>
              </Grid>
              <Grid item xl={6}>
                <Button component="a" href="#influenciadores" variant="text">
                  <Typography variant="footer">
                    Parceiros & Influenciadores
                  </Typography>
                </Button>
              </Grid>
              <Grid item xl={6}>
                <Button component="a" href="#ferramentas" variant="text">
                  <Typography variant="footer">Ferramentas</Typography>
                </Button>
              </Grid>
              <Grid item xl={6}>
                <Button component="a" href="#depoimentos" variant="text">
                  <Typography variant="footer">Depoimentos</Typography>
                </Button>
              </Grid>
              <Grid item xl={6}>
                <Button component="a" href="#faq" variant="text">
                  <Typography variant="footer">FAQ</Typography>
                </Button>
              </Grid>
              <Grid item xl={6}>
                <Button component="a" href="#contato" variant="text">
                  <Typography variant="footer">Contato</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageSection>
      <Dialog
        open={open}
        onClose={closeMenu}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
      >
        <AppBar position="relative" color="secondary">
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between", p: 1.7 }}
          >
            <Box component={"img"} src="/images/logo.svg" height="43px" />
            <IconButton onClick={closeMenu}>
              <CloseIcon color="primary" fontSize="large" />
            </IconButton>
          </Toolbar>
          <List sx={{ py: 0 }}>
            <ListItemButton href="#sobrenos" onClick={closeMenu}>
              Sobre
            </ListItemButton>
            <ListItemButton href="#influenciadores" onClick={closeMenu}>
              Parceiros & Influenciadores
            </ListItemButton>
            <ListItemButton href="#ferramentas" onClick={closeMenu}>
              Ferramentas
            </ListItemButton>
            <ListItemButton href="#depoimentos" onClick={closeMenu}>
              Depoimentos
            </ListItemButton>
            <ListItemButton href="#faq" onClick={closeMenu}>
              FAQ
            </ListItemButton>
            <ListItemButton href="#contato" onClick={closeMenu}>
              Contato
            </ListItemButton>
          </List>
        </AppBar>
        {/* <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={1}
          border={1}
          borderColor={"red"}
        >
          <Box display={{ xs: "flex", md: "none" }}>
            <IconButton onClick={closeMenu}>
              <CloseIcon color="primary" fontSize="large" />
            </IconButton>
          </Box>
        </Box> */}
      </Dialog>
    </>
  );
}
2;
