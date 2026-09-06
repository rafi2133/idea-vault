"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";

const ThemeToggole = () => {
    const { theme, setTheme } = useTheme();
    // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    return (
        <div>
            <Switch defaultSelected aria-label="Theme toggle" size="lg" onChange={()=> setTheme(theme === 'dark' ? '"light' : 'dark')}>
                {({ isSelected }) => (
                    <Switch.Content>
                        <Switch.Control className={isSelected ? "" : ""}>
                            <Switch.Thumb>
                                <Switch.Icon>
                                    {isSelected ? (
                                        <Sun className="size-3 text-inherit opacity-100" />
                                    ) : (
                                        <Moon className="size-3 text-inherit opacity-70" />
                                    )}
                                </Switch.Icon>
                            </Switch.Thumb>
                        </Switch.Control>
                    </Switch.Content>
                )}
            </Switch>
        </div>
    );
};

export default ThemeToggole;