export const MainPOIData: Array<any> = [
  {
    val: 'Hopitaux',
    iconName: 'add_circle_outline',
    iconUrl: '/assets/icons/hospital-main.svg',
    greyIconUrl: '/assets/icons/grey-icons/hos.svg',
    color: '#E00000',
    children: [{
      val: 'Urgences',
      iconUrl: '/assets/icons/hospital.svg',
      openroute_ids: ['206', '202']
    },
    {
      val: 'Pharmacies',
      iconUrl: '/assets/icons/pharmacy.svg',
      openroute_ids: ['208']
    },
    {
      val: 'Médecins',
      iconUrl: '/assets/icons/doctor.svg',
      openroute_ids: ['204']
    }]
  },
  {
    val: 'Education',
    iconUrl: '/assets/icons/schoolmain.svg',
    greyIconUrl: '/assets/icons/grey-icons/sch.svg',
    color: '#9700CE',
    children: [{
      val: 'Écoles maternelles',
      iconUrl: '/assets/icons/child.svg',
      openroute_ids: ['153']
    },
    {
      val: 'Écoles / Collèges / Lycées',
      iconUrl: '/assets/icons/ecoles.svg',
      openroute_ids: ['156']
    },
    {
      val: 'Universités / Écoles suppérieures',
      iconUrl: '/assets/icons/university.svg',
      openroute_ids: ['157', '154', '155', '151']
    }]
  },
  {
    val: 'Tram',
    iconUrl: '/assets/icons/tram-main.svg',
    greyIconUrl: '/assets/icons/grey-icons/tra.svg',
    iconName: 'tram',
    color: '#003CFF',
    children: [{
      val: 'Arrêts de tram',
      iconUrl: '/assets/icons/tram.svg',
      openroute_ids: ['605']
    },
    {
      val: 'Arrêts de bus',
      iconUrl: '/assets/icons/bus.svg',
      openroute_ids: ['587', '588', '604']
    },
    {
      val: 'Stations vélos libre-service',
      iconUrl: '/assets/icons/vlov.svg',
      openroute_ids: ['584']
    }]
  },
  {
    val: 'Nature',
    iconUrl: '/assets/icons/garden.svg',
    greyIconUrl: '/assets/icons/grey-icons/eco.svg',
    color: '#0F772E',
    children: [{
      val: 'Parcs',
      iconUrl: '/assets/icons/nature.svg',
      openroute_ids: ['280']
    },
    {
      val: 'Aires de jeux',
      iconUrl: '/assets/icons/foot.svg',
      openroute_ids: ['283']
    },
    ]
  },
  {
    val: 'Loisirs',
    iconUrl: '/assets/icons/sport.svg',
    greyIconUrl: '/assets/icons/grey-icons/spo.svg',
    color: '#FF9000',
    children: [
      {
        val: 'Centres Sportifs',
        iconUrl: '/assets/icons/fitness.svg',
        openroute_ids: ['288']
      },
      {
        val: 'Culture',
        iconUrl: '/assets/icons/activity.svg',
        openroute_ids: ['134', '135', '224', '232', '239', '240', '621', '430']
      },
      {
        val: 'Arts',
        iconUrl: '/assets/icons/palette.svg',
        openroute_ids: [, '131', '132', '133', '134', '136']
      }
    ]
  },
  {
    val: 'Achats',
    iconUrl: '/assets/icons/shopping-main.svg',
    greyIconUrl: '/assets/icons/grey-icons/sho.svg',
    color: '#00B4FF',
    children: [{
      val: 'Supermarchés',
      iconUrl: '/assets/icons/shopping.svg',
      openroute_ids: ['518']
    },
    {
      val: 'Places du marché',
      iconUrl: '/assets/icons/storefront.svg',
      openroute_ids: ['493']
    },
    {
      val: 'Bars',
      iconUrl: '/assets/icons/bar.svg',
      openroute_ids: ['563', '561', '564']
    },
    {
      val: 'Restaurants',
      iconUrl: '/assets/icons/restaurant.svg',
      openroute_ids: ['570']
    }]
  }
];