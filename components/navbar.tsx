import { getSession } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { SignupButton } from "@/components/signup-button"
import { LoginButton } from "@/components/login-button"
import { LogoutButton } from "@/components/logout-button"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const ListItem = ({ className, title, href, children }: { className?: string; title: string; href: string; children: React.ReactNode }) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
)

export default async function NavBar() {
  const session = await getSession()
  const user = session?.user

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto flex items-center justify-between py-4">
        <NavigationMenu>
          <NavigationMenuList>
            {user ? (
              // Menu for logged-in users
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/killjoy"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              VI Chat
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Ask questions and get answers from our VALORANT Inteligence, powered by Killjoy's LLM.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/dashboard"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Dashboard
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              View your personalized dashboard.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        </li>
                      <ListItem href="/middleware" title="Games and scrims">
                        View your games and scrims data.
                      </ListItem>
                      <ListItem href="/auth-protected" title="Settings">
                        Customize your account settings and preferences.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/api/data" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Protected API
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            ) : (
              // Menu for non-logged-in users
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/about"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              About Us
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Learn more about our company and mission
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/team" title="Our Team">
                        Meet the people behind our success
                      </ListItem>
                      <ListItem href="/mission" title="Our Mission">
                        Discover what drives us forward
                      </ListItem>
                      <ListItem href="/history" title="Our History">
                        Explore our journey and milestones
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Functions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="/features" title="Features">
                        Explore our product features
                      </ListItem>
                      <ListItem href="/pricing" title="Pricing">
                        View our pricing plans
                      </ListItem>
                      <ListItem href="/integrations" title="Integrations">
                        See how we integrate with other tools
                      </ListItem>
                      <ListItem href="/use-cases" title="Use Cases">
                        Discover how others use our product
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/faq" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      FAQ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/terms" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Terms of Use
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-4">
          {!user && (
            <>
              <SignupButton />
              <LoginButton />
            </>
          )}
          {user && <LogoutButton />}
        </div>
      </div>
    </div>
  )
}