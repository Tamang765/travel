// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components

// ----------------------------------------------------------------------

// const icon = (name) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

const icon = (name) => (
  <img alt={name} src={`/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  coupon: icon("ic_coupon"),
  notification: icon("ic_notification"),
  profile: icon("ic_profile"),
  videohub: icon("ic_pages"),
  blogs: icon("ic_blogs"),
  settings: icon("ic_settings"),
  tripHour: icon("ic_trip_hr"),
  vehicle: icon("ic_vehicle"),
  reports: icon("ic_reports"),
  contacts: icon("ic_contacts"),
  stadium: icon("ic_stadium"),
  testimonials: icon("ic_testimonials"),
  season: icon("ic_season"),
  team: icon("ic_team"),
  position: icon("ic_position"),
  keyperson: icon("ic_keyperson"),
  role: icon("ic_role"),
  photo: icon("ic_photo"),
};

const navConfig = [
  // analytics
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.dashboard,
        icon: ICONS.dashboard,
      },
      { title: "Profile", path: PATH_DASHBOARD.profile, icon: ICONS.profile },
      {
        title: "Notifications",
        path: PATH_DASHBOARD.notification,
        icon: ICONS.notification,
      },
    ],
  },

  {
    subheader: "Registration",
    items: [
      {
        title: "Registration",
        path: PATH_DASHBOARD.registrations.root,
        icon: ICONS.user,
        children: [
          {
            title: "Players list",
            path: PATH_DASHBOARD.registrations.players.list,
          },
          {
            title: "Coach List",
            path: PATH_DASHBOARD.registrations.coach.list,
          },
          {
            title: "Referee List",
            path: PATH_DASHBOARD.registrations.technical.list,
          },

          {
            title: "Users List",
            path: PATH_DASHBOARD.registrations.users.list,
          },
        ],
      },
    ],
  },

  {
    subheader: "Verified",
    items: [
      {
        title: "Verified",
        path: PATH_DASHBOARD.verified.root,
        icon: ICONS.user,
        children: [
          {
            title: "Players",
            path: PATH_DASHBOARD.verified.players.root,
            children: [
              {
                title: "Players List",
                path: PATH_DASHBOARD.verified.players.list,
              },
              {
                title: "Add new player",
                path: PATH_DASHBOARD.verified.players.add,
              },
            ],
          },

          {
            title: "Coach",
            path: PATH_DASHBOARD.verified.coach.root,
            children: [
              {
                title: "Coach List",
                path: PATH_DASHBOARD.verified.coach.list,
              },
              {
                title: "Add new coach",
                path: PATH_DASHBOARD.verified.coach.add,
              },
            ],
          },
        ],
      },

    ],
  },

  // User Management
  // ----------------------------------------------------------------------
  {
    subheader: "Contents",
    items: [
      {
        title: "News",
        path: PATH_DASHBOARD.news.root,
        icon: ICONS.blogs,
        children: [
          { title: "News list", path: PATH_DASHBOARD.news.list },
          { title: "Create new news", path: PATH_DASHBOARD.news.add },
        ],
      },

      {
        title: "Features",
        path: PATH_DASHBOARD.feature.root,
        icon: ICONS.blogs,
        children: [
          { title: "Features list", path: PATH_DASHBOARD.feature.list },
          { title: "Create new feature", path: PATH_DASHBOARD.feature.add },
        ],
      },

      {
        title: "Photos",
        path: PATH_DASHBOARD.photo.root,
        icon: ICONS.photo,
        children: [
          { title: "photos list", path: PATH_DASHBOARD.photo.list },
          { title: "Create Photo", path: PATH_DASHBOARD.photo.add },
        ],
      },
      {
        title: "VideoHub",
        path: PATH_DASHBOARD.videohub.root,
        icon: ICONS.videohub,
        children: [
          { title: "videohub list", path: PATH_DASHBOARD.videohub.list },
          { title: "Create VideHub", path: PATH_DASHBOARD.videohub.add },
        ],
      },

    ],
  },

  // User Management
  // ----------------------------------------------------------------------
  {
    subheader: "NKL FIXTURES",
    items: [
      {
        title: "Matches",
        path: PATH_DASHBOARD.games.root,
        icon: ICONS.blogs,
        children: [
          { title: "Matches list", path: PATH_DASHBOARD.games.list },
          { title: "Create new match", path: PATH_DASHBOARD.games.add },
        ],
      },
    ],
  },

  // TODO: team
  {
    subheader: "NKL Teams",
    items: [
      {
        title: "Teams",
        path: PATH_DASHBOARD.teams.root,
        icon: ICONS.team,
        children: [
          { title: "Team list", path: PATH_DASHBOARD.teams.list },
          { title: "Create new team", path: PATH_DASHBOARD.teams.add },
        ],
      },
    ],
  },
  // TODO: NKL ===============
  {
    subheader: "NKL Settings",
    items: [
      {
        title: "NKL Settings",
        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.settings,
        children: [
          {
            title: "Seasons",
            path: PATH_DASHBOARD.settings.seasons.list,
            children: [
              {
                title: "Season list",
                path: PATH_DASHBOARD.settings.seasons.list,
              },
              {
                title: "Create new season",
                path: PATH_DASHBOARD.settings.seasons.add,
              },
            ],
          },

          // TODO: stadiums
          {
            title: "Stadiums",
            path: PATH_DASHBOARD.settings.stadiums.root,
            children: [
              {
                title: "Stadium list",
                path: PATH_DASHBOARD.settings.stadiums.list,
              },
              {
                title: "Create new stadium",
                path: PATH_DASHBOARD.settings.stadiums.add,
              },
            ],
          },

          // TODO: Key-Persons
          {
            title: "Key-Persons",
            path: PATH_DASHBOARD.settings.keypersons.root,
            children: [
              {
                title: "Key persons list",
                path: PATH_DASHBOARD.settings.keypersons.list,
              },
              {
                title: "Create new key person",
                path: PATH_DASHBOARD.settings.keypersons.add,
              },
            ],
          },

          // TODO: positioins
          {
            title: "Positions",
            path: PATH_DASHBOARD.settings.positions.root,
            children: [
              {
                title: "Positions list",
                path: PATH_DASHBOARD.settings.positions.list,
              },
              {
                title: "Create new position",
                path: PATH_DASHBOARD.settings.positions.add,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    subheader: "Sponsors",
    items: [
      {
        title: "Sponsors",
        path: PATH_DASHBOARD.sponsors.root,
        icon: ICONS.profile,
        children: [
          { title: "Sponsors list", path: PATH_DASHBOARD.sponsors.list },
          { title: "Create Sponsor", path: PATH_DASHBOARD.sponsors.add },
        ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: "management",
  //   items: [
  //     {
  //       title: "Help and Support",
  //       path: PATH_DASHBOARD.manage.root,
  //       icon: ICONS.user,
  //       children: [{ title: "FAQs", path: PATH_DASHBOARD.manage.faqs }],
  //     },
  //   ],
  // },
];

export default navConfig;
