/*Global Navigation controller*/

app.controller('globalNavCtrl', function($scope) {
    $scope.showDetails=true;
    $scope.navMenu = [

        {
            "title": "Products",
            "href": "#",
            "id": "products",
            "viewMore": "View Products",
            "menu": [{
                    column1: {
                        submenu: [{
                            "title": "Data Center & Cloud Infrastructure",
                            items: [{
                                "title": "vCloud Suite",
                                "href": "#"
                            }, {
                                "title": "vSphere with Operations Management",
                                "href": "#"
                            }, {
                                "title": "vSphere",
                                "href": "#"
                            }]

                        }, {
                            "title": "Networking & Security",
                            items: [{
                                "title": "NSX",
                                "href": "#"
                            }]

                        }, {
                            "title": "Storage & Availability",
                            items: [{
                                "title": "Virtual SAN",
                                "href": "#"
                            }, {
                                "title": "vCenter Site Recovery Manager",
                                "href": "#"
                            }]

                        }]
                    },
                    column2: {
                        submenu: [{
                            "title": "Infrastructure as a Service",
                            items: [{
                                "title": "vCloud Air Dedicated Cloud",
                                "href": "#"
                            }, {
                                "title": "vCloud Air Virtual Private Cloud",
                                "href": "#"
                            }, {
                                "title": "vCloud Air Disaster Recovery",
                                "href": "#"
                            }]

                        }, {
                            "title": "Data Center & Cloud Management",
                            items: [{
                                "title": "vRealize Suite",
                                "href": "#"
                            }, {
                                "title": "vRealize Operations Insight",
                                "href": "#"
                            }, {
                                "title": "vRealize Automation",
                                "href": "#"
                            }]

                        }, {
                            "title": "Personal Desktop",
                            items: [{
                                "title": "Fusion",
                                "href": "#"
                            }, {
                                "title": "Fusion Pro",
                                "href": "#"
                            }, {
                                "title": "Workstation",
                                "href": "#"
                            }, {
                                "title": "Player Pro",
                                "href": "#"
                            }]

                        }]
                    },
                    column3: {
                        submenu: [{
                            "title": "Desktop & Application Virtualization",
                            items: [{
                                "title": "Horizon (with View)",
                                "href": "#"
                            }, {
                                "title": "Horizon Air Desktops",
                                "href": "#"
                            }, {
                                "title": "Horizon FLEX",
                                "href": "#"
                            }]

                        }, {
                            "title": "Enterprise Mobility Management",
                            items: [{
                                "title": "AirWatch",
                                "href": "#"
                            }]

                        }, {
                            "title": "Hyper-Converged Infrastructure",
                            items: [{
                                "title": "EVO:RAIL",
                                "href": "#"
                            }]

                        }, {
                            "title": "Free Products",
                            items: [{
                                "title": "vSphere Hypervisor",
                                "href": "#"
                            }, {
                                "title": "vCenter Converter",
                                "href": "#"
                            }]

                        }]
                    },
                    column4: {
                        submenu: [{
                            "title": "Related Topics",
                            items: [{
                                "title": "Software-Defined Data Center",
                                "href": "#"
                            }, {
                                "title": "Virtualization",
                                "href": "#"
                            }, {
                                "title": "Cloud Computing",
                                "href": "#"
                            }, {
                                "title": "Virtualization & Cloud Management",
                                "href": "#"
                            }, {
                                "title": "End-User Computing",
                                "href": "#"
                            }, {
                                "title": "Virtualizing Enterprise Applications",
                                "href": "#"
                            }, {
                                "title": "Industry Solutions",
                                "href": "#"
                            }, {
                                "title": "Horizon Solutions",
                                "href": "#"
                            }, {
                                "title": "Small Business Solutions",
                                "href": "#"
                            }]

                        }]
                    }
                }

            ]
        },

        {
            "title": "Support",
            "href": "#",
            "id": "support",
            "menu": [{
                    column1: {
                        submenu: [{
                            "title": "Product Support Centers",
                            items: [{
                                "title": "vSphere",
                                "href": "#"
                            }, {
                                "title": "vCloud Air (formerly vCloud Hybrid Service)",
                                "href": "#"
                            }, {
                                "title": "vSphere with Operations Management",
                                "href": "#"
                            }, {
                                "title": "Horizon (with View)",
                                "href": "#"
                            }, {
                                "title": "vCloud Director",
                                "href": "#"
                            }, {
                                "title": "vRealize Operations",
                                "href": "#"
                            }, {
                                "title": "Fusion",
                                "href": "#"
                            }, {
                                "title": "Workstation",
                                "href": "#"
                            }, {
                                "title": "vSphere Hypervisor (ESXi)",
                                "href": "#"
                            }, {
                                "title": "vCenter Server",
                                "href": "#"
                            }]

                        }]
                    },
                    column2: {
                        submenu: [{
                            "title": "Top Support Tasks",
                            items: [{
                                "title": "Search Knowledge Base",
                                "href": "#"
                            }, {
                                "title": "Login to My VMware",
                                "href": "#"
                            }, {
                                "title": "File a Support Request",
                                "href": "#"
                            }, {
                                "title": "View Filed Support Requests",
                                "href": "#"
                            }, {
                                "title": "Manage Support Contracts",
                                "href": "#"
                            }, {
                                "title": "View Orders",
                                "href": "#"
                            }, {
                                "title": "Register Products",
                                "href": "#"
                            }, {
                                "title": "Manage Your License Keys",
                                "href": "#"
                            }]

                        }]
                    },
                    column3: {
                        submenu: [{
                            "title": "Support Resources",
                            items: [{
                                "title": "Security Advisories",
                                "href": "#"
                            }, {
                                "title": "Product Documentation",
                                "href": "#"
                            }, {
                                "title": "Technical Papers",
                                "href": "#"
                            }, {
                                "title": "Compatibility Guides",
                                "href": "#"
                            }, {
                                "title": "Customer Advocacy",
                                "href": "#"
                            }]

                        }]
                    }
                }

            ]
        }, {
            "title": "Downloads",
            "href": "#",
            "id": "downloads",
            "viewMore": "All Downloads, Drivers & Tools",
            "menu": [{
                    column1: {
                        submenu: [{
                            "title": "Product Downloads",
                            items: [{
                                "title": "vSphere",
                                "href": "#"
                            }, {
                                "title": "vSphere with Operations Management",
                                "href": "#"
                            }, {
                                "title": "vCloud Director",
                                "href": "#"
                            }, {
                                "title": "vCloud Suite",
                                "href": "#"
                            }, {
                                "title": "VMware vSphere Hypervisor (ESXi)",
                                "href": "#"
                            }, {
                                "title": "vCenter Site Recovery Manager",
                                "href": "#"
                            }, {
                                "title": "Horizon (with View)",
                                "href": "#"
                            }, {
                                "title": "Fusion",
                                "href": "#"
                            }, {
                                "title": "Workstation",
                                "href": "#"
                            }]

                        }]
                    },
                    column2: {
                        submenu: [{
                            "title": "Free Product Trials",
                            items: [{
                                "title": "Accelerate Advisory Services",
                                "href": "#"
                            }, {
                                "title": "vSphere",
                                "href": "#"
                            }, {
                                "title": "vSphere with Operations Management",
                                "href": "#"
                            }, {
                                "title": "vCloud Director",
                                "href": "#"
                            }, {
                                "title": "vCenter Site Recovery Manager",
                                "href": "#"
                            }, {
                                "title": "Horizon (with View)",
                                "href": "#"
                            }, {
                                "title": "Fusion",
                                "href": "#"
                            }, {
                                "title": "Workstation",
                                "href": "#"
                            }, {
                                "title": "All Product Trials",
                                "href": "#"
                            }]

                        }]
                    },
                    column3: {
                        submenu: [{
                            "title": "Free Product Downloads",
                            items: [{
                                "title": "vSphere Hypervisor",
                                "href": "#"
                            }, {
                                "title": "vCenter Converter",
                                "href": "#"
                            }, {
                                "title": "Compliance Checker for PCI",
                                "href": "#"
                            }, {
                                "title": "Compliance Checker for vSphere",
                                "href": "#"
                            }, {
                                "title": "Player",
                                "href": "#"
                            }]

                        }]
                    }
                }

            ]
        },

        {
            "title": "Consulting",
            "href": "#",
            "id": "consulting",
            "menu": [{
                    column1: {
                        submenu: [{
                            "title": "Consulting Services",
                            items: [{
                                "title": "Accelerate Advisory Services",
                                "href": "#"
                            }, {
                                "title": "Technology Consulting",
                                "href": "#"
                            }, {
                                "title": "Technical Account Manager Services",
                                "href": "#"
                            }, {
                                "title": "Service Portfolio",
                                "href": "#"
                            }, {
                                "title": "Purchase Training & Consulting Credits",
                                "href": "#"
                            }]

                        }]
                    }
                }

            ]
        }, {
            "title": "Partners",
            "href": "#",
            "id": "partners",
            "menu": [{
                    column1: {
                        submenu: [{
                            "title": "Partner Programs",
                            "hasItems":true,
                            items: [{
                                "title": "Resellers"
                            }, {
                                "title": "VMware Solution Provider Program",
                                "href": "#"
                            }, {
                                "title": "Solution Competencies",
                                "href": "#"
                            }, {
                                "title": "Specializations",
                                "href": "#"
                            }]

                        }, {
                            "hasItems":true,
                           // "title": "Networking & Security",
                            items: [{
                                "title": "Services"
                            }, {
                                "title": "VMware Service Provider Program (VSPP)",
                                "href": "#"
                            }, {
                                "title": "Consulting and Integration Partner Programs (CIPP)",
                                "href": "#"
                            }, {
                                "title": "VMware Authorized Training Centers (VATC)",
                                "href": "#"
                            }]

                        }, {
                            "hasItems":true,
                        //    "title": "Storage & Availability",
                            items: [{
                                "title": "Technology"
                            }, {
                                "title": "Technology Alliance Partner Program (TAP)",
                                "href": "#"
                            }, {
                                "title": "VMware Ready",
                                "href": "#"
                            }, {
                                "title": "Embedded OEM",
                                "href": "#"
                            }, {
                                "title": "ISV Center",
                                "href": "#"
                            }, {
                                "title": "VMware Solution Exchange",
                                "href": "#"
                            }, {
                                "title": "OEM Partner Program",
                                "href": "#"
                            }]

                        }]
                    },
                    column2: {
                        submenu: [{
                            "title": "Partner Resources",
                            items: [{
                                "title": "Partner Central",
                                "href": "#"
                            }, {
                                "title": "Partner University",
                                "href": "#"
                            }, {
                                "title": "Promote Products and Solutions",
                                "href": "#"
                            }, {
                                "title": "My VMware Partner Resources",
                                "href": "#"
                            }]

                        }, {
                            "title": "Global Research and Education",
                            items: [{
                                "title": "VMware IT Academy Program",
                                "href": "#"
                            }, {
                                "title": "VMware Academic Program",
                                "href": "#"
                            }]

                        }, {
                            "title": "Find Partners",
                            items: [{
                                "title": "Global Alliances",
                                "href": "#"
                            }, {
                                "title": "Partner Locator",
                                "href": "#"
                            }, {
                                "title": "Consulting and Integration Partners",
                                "href": "#"
                            }, {
                                "title": "VMware Solution Exchange",
                                "href": "#"
                            }]

                        }]
                    }

                }

            ]
        }, {
            "title": "Company",
            "href": "#",
            "id": "company",
            "menu": [{
                    column1: {
                        submenu: [{
                            "title": "News & Events",
                            items: [{
                                "title": "Newsroom",
                                "href": "#"
                            }, {
                                "title": "Events",
                                "href": "#"
                            }, {
                                "title": "On Demand Webcasts",
                                "href": "#"
                            }]

                        }, {
                            "title": "Company Information",
                            items: [{
                                "title": "Executive Leadership",
                                "href": "#"
                            }, {
                                "title": "Leadership Perspectives",
                                "href": "#"
                            }, {
                                "title": "Careers at VMware",
                                "href": "#"
                            }, {
                                "title": "Executive Resource Center",
                                "href": "#"
                            }, {
                                "title": "Why Choose VMware",
                                "href": "#"
                            }, {
                                "title": "Contact VMware",
                                "href": "#"
                            }, {
                                "title": "Company Merchandise",
                                "href": "#"
                            }]

                        }]
                    },
                    column2: {
                        submenu: [{
                            "title": "Customers",
                            items: [{
                                "title": "Customers",
                                "href": "#"
                            }]

                        }, {
                            "title": "Investor Relations",
                            items: [{
                                "title": "Investor Relations",
                                "href": "#"
                            }]

                        }]
                    }

                }

            ]
        }
    ];
});