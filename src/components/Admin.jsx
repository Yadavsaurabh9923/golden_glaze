import React, { useState, useEffect } from "react";
import {
    Input,
    Button,
    Stack,
    Typography,
    Alert,
    CircularProgress,
    Box,
    Card
} from "@mui/joy";
import { BASE_URL } from "./BaseConfig";

const Admin = () => {
    // States for session rates
    const [rates, setRates] = useState({});
    const [loadingRates, setLoadingRates] = useState(true);
    
    // States for configs
    const [configs, setConfigs] = useState({});
    const [loadingConfigs, setLoadingConfigs] = useState(true);

    // Shared states for saving, error, and success messages
    const [saving, setSaving] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch session rates
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(`${BASE_URL}/rates`);
                if (!response.ok) throw new Error("Failed to fetch rates");
                const data = await response.json();
                const ratesData = data.reduce((acc, rate) => {
                    acc[rate.session] = rate.rate.toString();
                    return acc;
                }, {});
                setRates(ratesData);
                setError(null);
            } catch (err) {
                setError("Failed to load rates. Please try again later.");
            } finally {
                setLoadingRates(false);
            }
        };

        fetchRates();
    }, []);

    // Fetch configs
    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/configs/`);
                if (!response.ok) throw new Error("Failed to fetch configs");
                const data = await response.json();
                const configData = data.reduce((acc, config) => {
                    acc[config.config_name] = config.config_value.toString();
                    return acc;
                }, {});
                setConfigs(configData);
                setError(null);
            } catch (err) {
                setError("Failed to load configs. Please try again later.");
            } finally {
                setLoadingConfigs(false);
            }
        };

        fetchConfigs();
    }, []);

    // Handlers for rates
    const handleRateChange = (session, value) => {
        setRates(prev => ({ ...prev, [session]: value }));
    };

    const handleRateSave = async (session) => {
        try {
            setSaving(session);
            setError(null);
            setSuccess(null);

            const num = parseFloat(rates[session]);
            if (isNaN(num)) throw new Error(`Invalid number in ${session}`);

            const response = await fetch(`${BASE_URL}/update_rate/session/${session}/${num}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to update rate");
            await response.json();

            setSuccess(`Rate for ${session.replace(/_/g, ' ')} updated successfully!`);
        } catch (err) {
            setError(err.message || "Failed to update rate. Please try again.");
        } finally {
            setSaving(null);
        }
    };

    // Handlers for configs
    const handleConfigChange = (configName, value) => {
        setConfigs(prev => ({ ...prev, [configName]: value }));
    };

    const handleConfigSave = async (configName) => {
        try {
            setSaving(configName);
            setError(null);
            setSuccess(null);

            const newValue = configs[configName];

            const response = await fetch(`${BASE_URL}/update_config/${configName}/${newValue}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to update config");
            await response.json();

            setSuccess(`Config ${configName.replace(/_/g, ' ')} updated successfully!`);
        } catch (err) {
            setError(err.message || "Failed to update config. Please try again.");
        } finally {
            setSaving(null);
        }
    };

    // Show a spinner if either rates or configs are still loading
    if (loadingRates || loadingConfigs) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress size="lg" />
            </Box>
        );
    }

    // Group session rates into weekdays and weekends
    const weekdayRates = Object.entries(rates).filter(([session]) => session.includes("WEEKDAY"));
    const weekendRates = Object.entries(rates).filter(([session]) => session.includes("WEEKEND"));

    // Group configs into weekdays and weekends
    const weekdayConfigs = Object.entries(configs).filter(([configName]) => configName.includes("WEEKDAY"));
    const weekendConfigs = Object.entries(configs).filter(([configName]) => configName.includes("WEEKEND"));

    return (
        <Box sx={{ 
            maxWidth: 600, 
            mx: "auto", 
            p: 3, 
            my: 4, 
            backgroundColor: 'background.paper', 
            borderRadius: 'md', 
            boxShadow: 'sm' 
        }}>
            <Typography 
                level="h2" 
                sx={{ 
                    textAlign: 'center', 
                    mb: 4, 
                    color: 'primary.800',
                    fontWeight: 'xl' 
                }}
            >
                Admin Panel
            </Typography>

            {error && <Alert color="danger" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert color="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Stack spacing={4} sx={{ px: 2 }}>
                {/* Session Rates Section */}
                <Box>
                    <Typography level="h3" sx={{ mb: 2, color: 'primary.800' }}>
                        Manage Session Rates
                    </Typography>
                    <Typography level="h4" sx={{ mt: 2, mb: 1, color: 'primary.700' }}>
                        Weekday Rates
                    </Typography>
                    {weekdayRates.map(([session, value]) => (
                        <Card 
                            key={session} 
                            variant="outlined" 
                            sx={{ 
                                p: 2, 
                                borderRadius: 'sm',
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
                            }}
                        >
                            <Typography 
                                level="title-sm" 
                                sx={{ 
                                    mb: 1.5, 
                                    textTransform: 'capitalize',
                                    color: 'text.primary'
                                }}
                            >
                                {session.replace(/_/g, ' ')}
                            </Typography>
                            <Stack direction="row" spacing={1.5}>
                                <Input
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleRateChange(session, e.target.value)}
                                    disabled={saving === session}
                                    startDecorator="₹"
                                    sx={{ flex: 1 }}
                                    slotProps={{
                                        input: {
                                            step: 0.01,
                                            min: 0,
                                            sx: { py: 1 }
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => handleRateSave(session)}
                                    loading={saving === session}
                                    disabled={saving === session}
                                    sx={{ 
                                        width: 100, 
                                        transition: 'all 0.2s',
                                        boxShadow: 'sm'
                                    }}
                                >
                                    {saving === session ? 'Saving...' : 'Save'}
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                    <Typography level="h4" sx={{ mt: 2, mb: 1, color: 'secondary.700' }}>
                        Weekend Rates
                    </Typography>
                    {weekendRates.map(([session, value]) => (
                        <Card 
                            key={session} 
                            variant="outlined" 
                            sx={{ 
                                p: 2, 
                                borderRadius: 'sm',
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
                            }}
                        >
                            <Typography 
                                level="title-sm" 
                                sx={{ 
                                    mb: 1.5, 
                                    textTransform: 'capitalize',
                                    color: 'text.primary'
                                }}
                            >
                                {session.replace(/_/g, ' ')}
                            </Typography>
                            <Stack direction="row" spacing={1.5}>
                                <Input
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleRateChange(session, e.target.value)}
                                    disabled={saving === session}
                                    startDecorator="₹"
                                    sx={{ flex: 1 }}
                                    slotProps={{
                                        input: {
                                            step: 0.01,
                                            min: 0,
                                            sx: { py: 1 }
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => handleRateSave(session)}
                                    loading={saving === session}
                                    disabled={saving === session}
                                    sx={{ 
                                        width: 100, 
                                        transition: 'all 0.2s',
                                        boxShadow: 'sm'
                                    }}
                                >
                                    {saving === session ? 'Saving...' : 'Save'}
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                </Box>

                {/* Configs Section */}
                <Box>
                    <Typography level="h3" sx={{ mb: 2, color: 'primary.800' }}>
                        Manage Configs
                    </Typography>
                    <Typography level="h4" sx={{ mt: 2, mb: 1, color: 'primary.700' }}>
                        Weekday Configs
                    </Typography>
                    {weekdayConfigs.map(([configName, value]) => (
                        <Card 
                            key={configName} 
                            variant="outlined" 
                            sx={{ 
                                p: 2, 
                                borderRadius: 'sm',
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
                            }}
                        >
                            <Typography 
                                level="title-sm" 
                                sx={{ 
                                    mb: 1.5, 
                                    textTransform: 'capitalize',
                                    color: 'text.primary'
                                }}
                            >
                                {configName.replace(/_/g, ' ')}
                            </Typography>
                            <Stack direction="row" spacing={1.5}>
                                <Input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleConfigChange(configName, e.target.value)}
                                    disabled={saving === configName}
                                    sx={{ flex: 1 }}
                                    slotProps={{
                                        input: { sx: { py: 1 } }
                                    }}
                                />
                                <Button
                                    onClick={() => handleConfigSave(configName)}
                                    loading={saving === configName}
                                    disabled={saving === configName}
                                    sx={{ 
                                        width: 100, 
                                        transition: 'all 0.2s',
                                        boxShadow: 'sm'
                                    }}
                                >
                                    {saving === configName ? 'Saving...' : 'Save'}
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                    <Typography level="h4" sx={{ mt: 2, mb: 1, color: 'secondary.700' }}>
                        Weekend Configs
                    </Typography>
                    {weekendConfigs.map(([configName, value]) => (
                        <Card 
                            key={configName} 
                            variant="outlined" 
                            sx={{ 
                                p: 2, 
                                borderRadius: 'sm',
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
                            }}
                        >
                            <Typography 
                                level="title-sm" 
                                sx={{ 
                                    mb: 1.5, 
                                    textTransform: 'capitalize',
                                    color: 'text.primary'
                                }}
                            >
                                {configName.replace(/_/g, ' ')}
                            </Typography>
                            <Stack direction="row" spacing={1.5}>
                                <Input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleConfigChange(configName, e.target.value)}
                                    disabled={saving === configName}
                                    sx={{ flex: 1 }}
                                    slotProps={{
                                        input: { sx: { py: 1 } }
                                    }}
                                />
                                <Button
                                    onClick={() => handleConfigSave(configName)}
                                    loading={saving === configName}
                                    disabled={saving === configName}
                                    sx={{ 
                                        width: 100, 
                                        transition: 'all 0.2s',
                                        boxShadow: 'sm'
                                    }}
                                >
                                    {saving === configName ? 'Saving...' : 'Save'}
                                </Button>
                            </Stack>
                        </Card>
                    ))}
                </Box>
            </Stack>
        </Box>
    );
};

export default Admin;
