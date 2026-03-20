import { describe, it, expect } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';

const configDir = join(process.cwd(), 'config');

describe('Config Files', () => {
  describe('Book Types Config', () => {
    it('should load book types from config file', async () => {
      const data = await readFile(join(configDir, 'book-types.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.types).toBeDefined();
      expect(config.types.length).toBe(4);
    });

    it('should have correct book type structure', async () => {
      const data = await readFile(join(configDir, 'book-types.json'), 'utf-8');
      const config = JSON.parse(data);
      const adventure = config.types.find(t => t.type === 'adventure');
      expect(adventure).toBeDefined();
      expect(adventure.name).toBe('儿童冒险');
      expect(adventure.theme_color).toBe('#FFD700');
    });

    it('should have all required book types', async () => {
      const data = await readFile(join(configDir, 'book-types.json'), 'utf-8');
      const config = JSON.parse(data);
      const types = config.types.map(t => t.type);
      expect(types).toContain('adventure');
      expect(types).toContain('fantasy');
      expect(types).toContain('romance');
      expect(types).toContain('business');
    });
  });

  describe('Character Types Config', () => {
    it('should load character types from config file', async () => {
      const data = await readFile(join(configDir, 'character-types.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure).toBeDefined();
      expect(config.fantasy).toBeDefined();
      expect(config.romance).toBeDefined();
      expect(config.business).toBeDefined();
    });

    it('should have 8 character types for adventure', async () => {
      const data = await readFile(join(configDir, 'character-types.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure.length).toBe(8);
    });

    it('should have 10 character types for fantasy', async () => {
      const data = await readFile(join(configDir, 'character-types.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.fantasy.length).toBe(10);
    });

    it('should have 10 character types for romance', async () => {
      const data = await readFile(join(configDir, 'character-types.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.romance.length).toBe(10);
    });

    it('should have 10 character types for business', async () => {
      const data = await readFile(join(configDir, 'character-types.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.business.length).toBe(10);
    });
  });

  describe('Personality Config', () => {
    it('should load personality from config file', async () => {
      const data = await readFile(join(configDir, 'personality.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.personality).toBeDefined();
    });

    it('should have 25 personality options', async () => {
      const data = await readFile(join(configDir, 'personality.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.personality.length).toBe(25);
    });

    it('should include common personality traits', async () => {
      const data = await readFile(join(configDir, 'personality.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.personality).toContain('勇敢');
      expect(config.personality).toContain('善良');
      expect(config.personality).toContain('幽默');
    });
  });

  describe('Speech Style Config', () => {
    it('should load speech styles from config file', async () => {
      const data = await readFile(join(configDir, 'speech-style.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.speech_styles).toBeDefined();
    });

    it('should have 25 speech style options', async () => {
      const data = await readFile(join(configDir, 'speech-style.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.speech_styles.length).toBe(25);
    });

    it('should include common speech styles', async () => {
      const data = await readFile(join(configDir, 'speech-style.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.speech_styles).toContain('简洁直接');
      expect(config.speech_styles).toContain('幽默风趣');
    });
  });

  describe('Plot Options Config', () => {
    it('should load plot options from config file', async () => {
      const data = await readFile(join(configDir, 'plot-options.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure).toBeDefined();
      expect(config.fantasy).toBeDefined();
      expect(config.romance).toBeDefined();
      expect(config.business).toBeDefined();
    });

    it('should have weather options for each book type', async () => {
      const data = await readFile(join(configDir, 'plot-options.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure.weather.length).toBe(28);
      expect(config.fantasy.weather.length).toBe(28);
      expect(config.romance.weather.length).toBe(28);
      expect(config.business.weather.length).toBe(28);
    });

    it('should have terrain options for each book type', async () => {
      const data = await readFile(join(configDir, 'plot-options.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure.terrain.length).toBe(28);
      expect(config.fantasy.terrain.length).toBe(28);
      expect(config.romance.terrain.length).toBe(28);
      expect(config.business.terrain.length).toBe(28);
    });

    it('should have adventure type options for each book type', async () => {
      const data = await readFile(join(configDir, 'plot-options.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure.adventure.length).toBe(28);
      expect(config.fantasy.adventure.length).toBe(28);
      expect(config.romance.adventure.length).toBe(28);
      expect(config.business.adventure.length).toBe(28);
    });

    it('should have equipment options for each book type', async () => {
      const data = await readFile(join(configDir, 'plot-options.json'), 'utf-8');
      const config = JSON.parse(data);
      expect(config.adventure.equipment.length).toBe(28);
      expect(config.fantasy.equipment.length).toBe(28);
      expect(config.romance.equipment.length).toBe(28);
      expect(config.business.equipment.length).toBe(28);
    });

    it('should have correct plot option structure', async () => {
      const data = await readFile(join(configDir, 'plot-options.json'), 'utf-8');
      const config = JSON.parse(data);
      const weather = config.adventure.weather[0];
      expect(weather.name).toBeDefined();
      expect(weather.icon).toBeDefined();
      expect(weather.description).toBeDefined();
    });
  });
});
